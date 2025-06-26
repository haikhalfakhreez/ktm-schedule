import os
from pathlib import Path
import camelot
import pandas as pd

pdf_dir = Path('./pdf')
csv_dir = Path('./csv')
csv_dir.mkdir(exist_ok=True)

for pdf_file in pdf_dir.glob('*.pdf'):
    try:
        print(f'Processing: {pdf_file.name}')
        tables = camelot.read_pdf(str(pdf_file), pages='all')

        if tables.n == 0:
            print(f'No tables found in {pdf_file.name}')
            continue

        df_all = pd.concat([table.df for table in tables])
        csv_file = csv_dir / (pdf_file.stem + '.csv')
        df_all.to_csv(csv_file, index=False)
        print(f'Saved: {csv_file}')

    except Exception as e:
        print(f'Error processing {pdf_file.name}: {e}')
