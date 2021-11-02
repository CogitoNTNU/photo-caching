#matplotlib notebook
import tensorflow as tf
#import matplotlib.pyplot as plt
import numpy as np
import random
#from pca_plotter import PCAPlotter
print('TensorFlow version:', tf.__version__)
import tensorflow as tf
import numpy as np
#from sklearn.decomposition import PCA

# (1) Importing dependency
import keras
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout, Flatten,\
 Conv2D, MaxPooling2D
from keras.layers.normalization import BatchNormalization
np.random.seed(1000)



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

"""embedding_model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(128,128,3)), #784
    tf.keras.layers.Dense(emb_size, activation='sigmoid')
])"""
model.add(Flatten())
model.add(Dense(64, input_shape=(64,)))#6193536
model.add(Activation('relu'))

model.summary() #skriver ut type nevralt nettverk man har.

batch_size = 40
output_y = np.ones((batch_size*3,))
output_y[2::3] = 0 #fikser 1 på positive eksempler, 0 på negativt
print(output_y)


#trainingData = picklefilen i 1-branchen 
test_batch = trainingData[::72] #fikset slik at batch size er 40, så må endres for andre koser 
stupid_way_to_do_this = []
while(test_batch != []): 
        stupid_way_to_do_this.append(test_batch[0][0])
        stupid_way_to_do_this.append(test_batch[0][1])
        stupid_way_to_do_this.append(test_batch[0][2])
        test_batch.pop()

print(len(test_batch))
print(len(stupid_way_to_do_this))
print(stupid_way_to_do_this[0].shape)

alpha = 0.2
def triplet_loss(y_pred):
    anchor, positive, negative = y_pred[:,:emb_size], y_pred[:,emb_size:2*emb_size], y_pred[:,2*emb_size:] #lurer på om dette må endres på 
    positive_dist = tf.reduce_mean(tf.square(anchor - positive), axis=1)
    negative_dist = tf.reduce_mean(tf.square(anchor - negative), axis=1)
    return tf.maximum(positive_dist - negative_dist + alpha, 0.)

model.compile(loss=triplet_loss, optimizer='adam')
#out = Dense(1, activation='sigmoid')
out = np.array(output_y)
input_model = np.array(stupid_way_to_do_this)
print(input_model.shape)
model.fit(x=input_model, batch_size=32)

"""
prøver å kjøre, men får "ValueError: No gradients provided for any variable: ['conv2d_51/kernel:0', 'conv2d_51/bias:0', 'conv2d_52/kernel:0', 
'conv2d_52/bias:0', 'conv2d_53/kernel:0', 'conv2d_53/bias:0', 'dense_53/kernel:0', 'dense_53/bias:0']."
"""