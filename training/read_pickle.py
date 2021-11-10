import numpy as np
import pickle
import matplotlib.pyplot as plt
import cv2 as cv

pickle_in = open("dataset.pickle", "rb")
dataset = np.load(pickle_in, allow_pickle=True)

def printPicture(dataset,case):
    cv.imshow("Image", dataset[case][2])
    cv.waitKey(0)
    cv.destroyAllWindows()
    print('her')
    """
    cv.imshow("Image", dataset[case][2][1])
    cv.waitKey(0)
    cv.destroyAllWindows()

    cv.imshow("Image", dataset[case][2][2])
    cv.waitKey(0)
    cv.destroyAllWindows()
"""

printPicture(dataset,33)




