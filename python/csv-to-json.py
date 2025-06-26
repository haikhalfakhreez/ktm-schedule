import pandas as pd
import json
import os

csv_folder = './csv'
output_folder = '../data'

# Make sure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# List all CSV files in the folder
for filename in os.listdir(csv_folder):
    if filename.endswith('.csv'):
        name = os.path.splitext(filename)[0]
        print(f'Start converting csv to json for {name}')

        # Read CSV file
        df = pd.read_csv(os.path.join(csv_folder, filename))

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
        output_dict = {"train": train_data, "data": data_dict}

        # Save to JSON file with the same base name
        output_path = os.path.join(output_folder, f'{name}.json')
        with open(output_path, 'w') as f:
            json.dump(output_dict, f)

        print(f'Finished converting {name}!')

print('All done!')
