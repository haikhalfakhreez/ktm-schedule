import camelot
import pandas as pd

# name = 'batu-caves-wd'
# name = 'batu-caves-wk'
# name = 'tg-malim-wd'
name = 'tg-malim-wk'

tables = camelot.read_pdf(r'./pdf/' + name + '.pdf', pages='all')
df_all = pd.concat([table.df for table in tables])
df_all.to_csv('output.csv', index=False)
