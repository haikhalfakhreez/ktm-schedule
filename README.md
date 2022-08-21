<p align="center">
  <img src="https://ktm-schedule.vercel.app/ktm-schedule.png" alt="KTM Schedule">
</p>

<p align="center">
  KTM Berhad Malaysia train schedule. In tables and routes view.
<p>

<p align="center">
  <a href="https://ktm-schedule.vercel.app"><strong>Browse Website</strong></a>
</p>

## About KTM Schedule

Last updated: <strong>22 August 2022</strong>

All data is from [KTM Train Schedule](https://www.ktmb.com.my/traintime.html) up to the above last updated date.
This project is heavily inspired by [desmondyeoh's ktmTime](https://github.com/desmondyeoh/ktmTime) GitHub repo.

## How data is extracted

#### Extracting

1. Download train times in PDF format from https://www.ktmb.com.my/traintime.html.
2. Convert all the PDF files into .docx format.
3. Inside each .docx file, there will be 2 tables. Copy each individual table into its own Google Sheet tab.
4. From Google Sheet, download the file for each tab in .csv format.

#### Converting .csv to .json

<em>Note: need to use Python for this step.</em>

1. Use [Pandas](https://pypi.org/project/pandas/) to parse all .csv files to .json format.

```python
import pandas as pd

name = 'your-file-name'
df = pd.read_csv(r'./' + name + '.csv')
df.to_json(r'./' + name + '.json')
```

2. Copy all the .json files into your project.

## Tech stack used

- Next JS
- TypeScript
- Tailwind
