import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
import imghdr
import random
import pickle
from PIL import Image



def MAC_get_folders_in_folder():
    rootDir = '.'
    folder_with_files = {}

    for dir_name, subdir_list, file_list in os.walk(rootDir):
        #print(dir_name)
        if(file_list != [] and ((imghdr.what(dir_name + "/" +file_list[0]) != None) or "HEIC" in file_list[0])): #må muligens endres til / på andre datamaskiner
            folder_with_files[dir_name] = file_list 
        #print(file_list)
    
    #for i in folder_with_files:     #se om riktig
        #print (i)#, "\n", a[i])
    return folder_with_files
print(MAC_get_folders_in_folder())

def convFromHEICtoJpg(image):
    im = Image.open(image)
    im_list = image.split(".")
    im_with_jpg = im_list[0] + ".jpg"
    print(im_with_jpg)
    im.save(im_with_jpg)
    



def createTrainingData():
    noneNum = 0
    dicPic = MAC_get_folders_in_folder() #This has to be changed if using windows

    for img in dicPic:
        if ".HEIC" in img:
            convFromHEICtoJpg(img)

    trainingData = []
    whatKeyWeAreOn = -1
    keyList = list(dicPic.keys())
    counter_steps = 0 
    
    for picOfBuildings in dicPic.values():
        whatKeyWeAreOn += 1

        index = 0
        while(index < len(picOfBuildings)): 
            p_base = picOfBuildings[index]
            for p_compare in picOfBuildings:
                if p_compare != p_base and p_compare != '.DS_Store':  #We had a problem with .DS_Store appering in the training_data
                    trainingCase = []
                    

                    listOfBuildings = []
                    for key in dicPic.keys():
                        if list(dicPic.keys())[whatKeyWeAreOn] != key: 
                            listOfBuildings.append(key)
                    
                    indexForBuilding = random.randint(0,len(listOfBuildings)-1)
                    key = listOfBuildings[indexForBuilding]
                    listOfPic = dicPic.get(key)
                    indexForPic = random.randint(0,len(listOfPic)-1)
                    
                    p_neg = key+ '/' + listOfPic[indexForPic]

                    print(keyList[whatKeyWeAreOn] + "/" + p_base)
                    trainingCase.append(
                        convertPreTrainingDataToActualPictures(keyList[whatKeyWeAreOn] + "/" + p_base, noneNum))
                    print(keyList[whatKeyWeAreOn] + "/" + p_base)
                    trainingCase.append(
                        convertPreTrainingDataToActualPictures(keyList[whatKeyWeAreOn] + "/" + p_compare, noneNum))
                    print(p_neg)
                    trainingCase.append(
                        convertPreTrainingDataToActualPictures(p_neg, noneNum))
                        
                    trainingData.append(trainingCase) 
                    counter_steps += 1
                    if counter_steps % 100 == 0:
                        print(counter_steps)
            break
            index += 1 
        break
    return trainingData



def convertPreTrainingDataToActualPictures(fileName, noneNum):
    IMG_SIZE = 128
    img_array = cv2.imread(fileName, cv2.IMREAD_UNCHANGED)
    try: 
        downSized_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    except: 
        noneNum += 1
        downSized_array= []
        
   
    #if(len(img_array) != 3): 
    #    downSized_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    #else:
    #    noneNum += 1
    #    downSized_array= []
    
    return downSized_array


trainingData = createTrainingData()
#print(trainingData[0][0])
#print(len(trainingData))



#print(trainingData)

#pickle_out = open("dataset.pickle", "wb")
#pickle.dump(trainingData, pickle_out)
#pickle_out.close()


#pickle_in = open("dataset.pickle", "rb")
#X = pickle.load(pickle_in)

print('done')