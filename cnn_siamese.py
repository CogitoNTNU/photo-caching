import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten, Conv2D, MaxPooling2D
from keras import layers, Input, Model, optimizers
import pickle
import numpy as np
import keras.backend as K

#X = pickle.load(open("dataset.pickle", "rb"))

emb_size = 128

# (3) Create a sequential model
model = Sequential()

# 1st Convolutional Layer
model.add(Conv2D(filters=64, input_shape=(128,128,3), kernel_size=(3,3),\
 strides=(1,1), padding='same'))
model.add(Activation('relu'))
# Pooling 
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2)))

# 2nd Convolutional Layer
model.add(Conv2D(filters=64, kernel_size=(3,3), strides=(1,1), padding='same'))
model.add(Activation('relu'))
# Pooling
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2)))

# 3rd Convolutional Layer
model.add(Conv2D(filters=64, kernel_size=(3,3), strides=(1,1), padding='same'))
model.add(Activation('relu'))

model.add(Flatten())
model.add(Dense(64, input_shape=(64,)))#6193536
model.add(Activation('relu'))

model.summary() #skriver ut type nevralt nettverk man har.

#trainingData = picklefilen i 1-branchen 

pickle_in = open("dataset.pickle", "rb")
training_data = pickle.load(pickle_in)
import random
random.shuffle(training_data)

no_of_batches = 36

def fix_anchor_positive_negative_tensor_batch(batchsplit):
        split_arrays = np.array_split(training_data, batchsplit)      
        return split_arrays
batches = fix_anchor_positive_negative_tensor_batch(no_of_batches)   


batch_size = len(training_data)//no_of_batches
y_train = np.ones((batch_size,batch_size,batch_size))
y_train[batch_size-1,:,:] = np.zeros((batch_size,batch_size))

def get_anc_pos_neg_in_batch(batch_list): 
    X_anchor = batch_list[:,0,:,:,:]
    X_positive = batch_list[:,1,:,:,:]
    X_negative = batch_list[:,2,:,:,:]
    return X_anchor, X_positive, X_negative

### used https://github.com/shakti365/Signature-Forgery-Detection/blob/master/notebooks/0.2-ss-siamese-model.ipynb
def euclidean_distance_loss(y_true, y_pred):
    """
    :param y_true: TensorFlow/Theano tensor
    :param y_pred: TensorFlow/Theano tensor of the same shape as y_true
    :return: float
    """
    return K.sqrt(K.sum(K.square(y_pred - y_true), axis=-1))

#og her
def triplet_loss(embeddings):
    """
    calculates triplet loss over inputs.
    """
    
    processed_a, processed_p, processed_n = embeddings[0], embeddings[1], embeddings[2]
    
    positive_dist= euclidean_distance_loss(processed_a, processed_p)
    negative_dist = euclidean_distance_loss(processed_a, processed_n)
       
    margin = 0.0
    loss = K.maximum(margin, positive_dist - negative_dist)
    
    return K.mean(loss)

#og her 
def identity_loss(y_true, y_pred):
    """
    Fake loss function for Keras.
    """
    return y_pred - 0 * y_true

#og her 
# Siamese model

in_dim=(128,128,3)
input_anchor = Input(shape=(in_dim))
input_positive = Input(shape=(in_dim))
input_negative = Input(shape=(in_dim))
embedding_a=model(input_anchor)
embedding_p=model(input_positive)
embedding_n=model(input_negative)

embedding_concat = layers.concatenate(inputs=[embedding_a, 
                                    embedding_p, 
                                    embedding_n], axis=-1)

loss_layer = layers.Lambda(function=triplet_loss, 
                     output_shape=(1,))

loss = loss_layer(embedding_concat)

siamese_model = Model(inputs=[input_anchor, input_positive, input_negative], 
                      outputs=loss)

siamese_model.compile(loss=identity_loss, optimizer="Adam")

siamese_model.summary()

###
for batch in batches: 
    X1_train, X2_train, X3_train = get_anc_pos_neg_in_batch(batch)
    siamese_model.fit(x=[X1_train, X2_train, X3_train], y=y_train, batch_size=32,)

#next: mekke testsett og evaluere
#score = model.evaluate(x_test, y_test, verbose = 0) 
#x_test, y_test = lage testsett på samme måte som treningssett 
#print('Test loss:', score[0]) 
#print('Test accuracy:', score[1])

#så predicte
