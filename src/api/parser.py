import csv

# file = open("dataset.txt", "r")
f = open ("insertion.sql","w")


with open('dataset.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    data = [r for r in reader]
    data.pop(0)
    print(data)

f.write("use DialogFlow;\n")
for line in data:
    values = line
    f.write("insert into book (name,author,category) values (" + '"' +values[3]+ '"' + "," + '"' + values[4]+'"'+","+'"'+values[6].rstrip()+'"'+');\n')

f.close()