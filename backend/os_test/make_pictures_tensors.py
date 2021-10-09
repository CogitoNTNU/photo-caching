import os 
import cv2
import numpy as np 
import imghdr
from tqdm import tqdm

def iterate_through_directory_files():
    """
    tar inn alle folderne og filene som inneholder bilder under mappen man er i 
    (kan endres om ønskelig), og gjør hver av bildene om til en tensor. 
    Tensoren lagres deretter i en dictionary (tenkte først ndarray, men de har ingen definert størrelse). 
    Dette er en litt treg prosess, så
    bør vurdere å finne en måte å fjerne de nøstede for-løkkene.
    """
    folders_with_pictures = get_folders_in_folder()  
    folders_with_tensors = {}#dict.fromkeys(list(folders_with_pictures.keys()),[])
    for folder, files in folders_with_pictures.items():
        folders_with_tensors[folder]= []
        for file in tqdm(files):
            tensor = openPicture("{}\\{}".format(folder, file))
            folders_with_tensors[folder] = [folders_with_tensors[folder], tensor]
    #for i in folders_with_tensors:     
           #print (i, "\n", folders_with_tensors[i])      
    return folders_with_tensors

def get_folders_in_folder(): 
    folder_with_files = {}
    rootDir = '.'
    for dir_name, subdir_list, file_list in os.walk(rootDir):
        if(file_list != [] and imghdr.what(dir_name +"\\" +file_list[0]) != None): #må muligens endres til \ på andre datamaskiner
            folder_with_files[dir_name] = file_list   
    #for i in a:     se om riktig
    #    print (i, "\n", a[i])
    return folder_with_files

def move_up_folder(): 
    os.chdir('..')
    
    
def get_relative_placement(fileName): 
    relative_path = os.path.relpath(fileName, os.getcwd())
    print(relative_path)

def get_current_path(): 
    current_path = os.getcwd()
    return current_path
    
def move_into_folder(folderName): 
    os.chdir("../"+folderName)
        
def openPicture(picName): 
    image = cv2.imread(picName)
    #print(image) #print hvis man mistenker at den returnerer None
    return image

