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
model.add(Conv2D(filters=96, input_shape=(128,128,3), kernel_size=(3,3),\
 strides=(1,1), padding='same'))
model.add(Activation('relu'))
# Pooling 
model.add(MaxPooling2D(pool_size=(2,2), strides=(1,1), padding='valid'))

# 2nd Convolutional Layer
model.add(Conv2D(filters=256, kernel_size=(3,3), strides=(1,1), padding='same'))
model.add(Activation('relu'))
# Pooling
model.add(MaxPooling2D(pool_size=(2,2), strides=(1,1), padding='same'))

# 3rd Convolutional Layer
model.add(Conv2D(filters=384, kernel_size=(3,3), strides=(1,1), padding='same'))
model.add(Activation('relu'))

"""embedding_model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(128,128,3)), #784
    tf.keras.layers.Dense(emb_size, activation='sigmoid')
])"""
model.add(Flatten())
model.add(Dense(64, input_shape=(6193536,)))
model.add(Activation('relu'))

model.summary() #skriver ut type nevralt nettverk man har.


"""
class PCAPlotter(tf.keras.callbacks.Callback):
    def __init__(self, plt, embedding_model, x_test, y_test):
        super(PCAPlotter, self).__init__()
        self.embedding_model = embedding_model
        self.x_test = x_test
        self.y_test = y_test
        self.fig = plt.figure(figsize=(9, 4))
        self.ax1 = plt.subplot(1, 2, 1)
        self.ax2 = plt.subplot(1, 2, 2)
        plt.ion()
        self.losses = []
    def plot(self, epoch=None, plot_loss=False):
        x_test_embeddings = self.embedding_model.predict(self.x_test)
        pca_out = PCA(n_components=2).fit_transform(x_test_embeddings)
        self.ax1.clear()
        self.ax1.scatter(pca_out[:, 0], pca_out[:, 1], c=self.y_test, cmap='seismic')
        if plot_loss:
            self.ax2.clear()
            self.ax2.plot(range(epoch), self.losses)
            self.ax2.set_xlabel('Epochs')
            self.ax2.set_ylabel('Loss')
        self.fig.canvas.draw()
    def on_train_begin(self, logs=None):
        self.losses = []
        self.fig.show()
        self.fig.canvas.draw()
        self.plot()
    def on_epoch_end(self, epoch, logs=None):
        self.losses.append(logs.get('loss'))
        self.plot(epoch+1, plot_loss=True)
"""
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
print(x_train.shape)
def plot_triplets(examples):
    plt.figure(figsize=(6, 2))
    for i in range(3):
        plt.subplot(1, 3, 1 + i)
        plt.imshow(np.reshape(examples[i], (28, 28)), cmap='binary')
        plt.xticks([])
        plt.yticks([])
    plt.show()
plot_triplets([x_train[0], x_train[1], x_train[2]])
def create_batch(batch_size=256):
    x_anchors = np.zeros((batch_size, 784))
    x_positives = np.zeros((batch_size, 784))
    x_negatives = np.zeros((batch_size, 784))
    for i in range(0, batch_size):
        # We need to find an anchor, a positive example and a negative example
        random_index = random.randint(0, x_train.shape[0] - 1)
        x_anchor = x_train[random_index]
        y = y_train[random_index]
        indices_for_pos = np.squeeze(np.where(y_train == y))
        indices_for_neg = np.squeeze(np.where(y_train != y))
        x_positive = x_train[indices_for_pos[random.randint(0, len(indices_for_pos) - 1)]]
        x_negative = x_train[indices_for_neg[random.randint(0, len(indices_for_neg) - 1)]]
        x_anchors[i] = x_anchor.reshape(x_anchors[i].shape[0],)
        x_positives[i] = x_positive.reshape(x_positives[i].shape[0],)
        x_negatives[i] = x_negative.reshape(x_negatives[i].shape[0],)
    return [x_anchors, x_positives, x_negatives]
examples = create_batch(1)
plot_triplets(examples)
"""
Her defineres modellen. Ser at vi lager en sekvensiell modell
tf.keras.layers.Dense: her er outputspacet til første lag 64, aktiveringsfunksjonen
er vanlig relu (lineær positiv, eller 0), og input shapen er (784,).
Neste lag har også output 64, og sigmoid aktivering. Input kommer fra forrige lag, så trengs ikke
skrives inn.  
tf.keras.models.Sequential: inneholder det nevrale nettverket. Alle lagene, inputsene og outputsene
skal inn her.
"""
emb_size = 128

# (3) Create a sequential model
model = Sequential()

# 1st Convolutional Layer
model.add(Conv2D(filters=96, input_shape=(224,224,3), kernel_size=(3,3),\
 strides=(1,1), padding='same'))
model.add(Activation('relu'))
# Pooling 
model.add(MaxPooling2D(pool_size=(2,2), strides=(1,1), padding='valid'))

# 2nd Convolutional Layer
model.add(Conv2D(filters=256, kernel_size=(3,3), strides=(1,1), padding='same'))
model.add(Activation('relu'))
# Pooling
model.add(MaxPooling2D(pool_size=(2,2), strides=(1,1), padding='same'))

# 3rd Convolutional Layer
model.add(Conv2D(filters=384, kernel_size=(3,3), strides=(1,1), padding='same'))
model.add(Activation('relu'))

"""embedding_model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(128,128,3)), #784
    tf.keras.layers.Dense(emb_size, activation='sigmoid')
])"""
model.summary() #skriver ut type nevralt nettverk man har.

example = x_train[0].reshape((1,784))
#example = np.expand_dims(x_train[0], axis=0)
example_emb = embedding_model.predict(example)[0]
print(example_emb)
input_anchor = tf.keras.layers.Input(shape=(128,128,3))
input_positive = tf.keras.layers.Input(shape=(128,128,3))
input_negative = tf.keras.layers.Input(shape=(128,128,3))
embedding_anchor = embedding_model(input_anchor)
embedding_positive = embedding_model(input_positive)
embedding_negative = embedding_model(input_negative)
output = tf.keras.layers.concatenate([embedding_anchor, embedding_positive, embedding_negative], axis=1)
net = tf.keras.models.Model([input_anchor, input_positive, input_negative], output)
net.summary()
alpha = 0.2
def triplet_loss(y_true, y_pred):
    anchor, positive, negative = y_pred[:,:emb_size], y_pred[:,emb_size:2*emb_size], y_pred[:,2*emb_size:]
    positive_dist = tf.reduce_mean(tf.square(anchor - positive), axis=1)
    negative_dist = tf.reduce_mean(tf.square(anchor - negative), axis=1)
    return tf.maximum(positive_dist - negative_dist + alpha, 0.)
def data_generator(batch_size=256):
    while True:
        x = create_batch(batch_size)
        y = np.zeros((batch_size, 3*emb_size))
        yield x, y
batch_size = 2048
epochs = 10
steps_per_epoch = int(x_train.shape[0]/batch_size)
net.compile(loss=triplet_loss, optimizer='adam')
_ = net.fit(
    data_generator(batch_size),
    steps_per_epoch=steps_per_epoch,
    epochs=epochs, verbose=False,
    callbacks=[
        PCAPlotter(
            plt, embedding_model,
            x_test[:1000].reshape((1000,784)), y_test[:1000]
        )]
)