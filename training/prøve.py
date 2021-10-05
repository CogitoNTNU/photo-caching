import cv2 as cv
import os

img = cv.imread('20211001_182542.jpg', cv.IMREAD_UNCHANGED)

print('Original Dimensions : ', img.shape)

width = int(128)
height = int(128)

dim = (width, height)

resized = cv.resize(img, dim, interpolation = cv.INTER_AREA)

print('Resized Dimensions : ', resized.shape)

cv.imshow("Resized image", resized)
cv.waitKey(0)
cv.destroyAllWindows()