import pandas as pd
import numpy as np
import json

# Define all name of files
# name = 'batu-caves-wk'
# name = 'pulau-sebang-wk'
# name = 'klang-wk'
name = 'tg-malim-wk'

print('Start converting csv to json for ' + name)

# Read the CSV file
df = pd.read_csv(r'./output/' + name + '.csv')

# Save 'train' data to a separate variable and remove from DataFrame
train_data = df['train'].to_dict()
df = df.drop('train', axis=1)

# Replace 'NaN' with None
df = df.where(pd.notnull(df), None)

# Convert DataFrame to dict and wrap into 'data' key
data_dict = df.to_dict(orient='list')

# Convert list values to dictionaries with index keys
for key, values in data_dict.items():
  data_dict[key] = {str(i): v for i, v in enumerate(values)}

# Combine 'train' and 'data' into one dict
output_dict = {**{"train": train_data}, **{"data": data_dict}}

# Save the dictionary to a JSON file
with open(r'../data/' + name + '.json', 'w') as f:
  json.dump(output_dict, f)

print('All done!')
