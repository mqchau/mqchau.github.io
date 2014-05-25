import csv
import pprint
import json

BigDict = dict();

def main():
    csvfiletoread = ['McDonalds List.csv','Carl\'s Jr.csv','In-N-Out.csv','Taco Bell.csv','BurgerKing.csv','Subway.csv', 'KFC.csv']
    for i in csvfiletoread[:]:
        csvfile = open(i, 'r')
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        rowcounter = 0
        for row in spamreader:
            if rowcounter == 0:
                current_res = row[0]
                BigDict[current_res] = dict()
            elif rowcounter >= 1:
                current_item = row[0]
                current_price =  row[1]
                current_calorie = row[2]
                current_fat = row[3]
                current_protein = row[4]
                current_carbs = row[5]
                current_sodium = row[6]                
                BigDict[current_res][current_item] = dict()
                BigDict[current_res][current_item]['price'] = current_price
                BigDict[current_res][current_item]['calories'] = current_calorie
                BigDict[current_res][current_item]['fat'] = current_fat
                BigDict[current_res][current_item]['protein'] = current_protein
                BigDict[current_res][current_item]['carbs'] = current_carbs
                BigDict[current_res][current_item]['sodium'] = current_sodium
            rowcounter = rowcounter + 1
        csvfile.close()        
    output = open('restaurantdatabase.js', 'w')
    json.dump(BigDict,output)
    output.close()

main()
