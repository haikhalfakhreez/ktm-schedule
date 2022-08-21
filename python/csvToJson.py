import pandas as pd

# Define all name of files
name = 'batu-caves-wk'
# name = 'pulau-sebang-wk'
# name = 'klang-wk'
# name = 'tg-malim-wk'

print('Start converting csv to json for ' + name)

df = pd.read_csv(r'./python/' + name + '.csv')
df.to_json(r'./python/' + name + '.json')

print('All done!')
