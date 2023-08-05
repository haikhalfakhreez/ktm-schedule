<p align="center">
  <img src="https://ktm-schedule.vercel.app/opengraph-image.png" alt="KTM Komuter Timetable">
</p>

<p align="center">
  KTM Komuter Malaysia train timetable. In tables and routes view.
<p>

<p align="center">
  <a href="https://ktm-schedule.vercel.app"><strong>Browse Website</strong></a>
</p>

## About KTM Schedule

Last updated: <strong>July 2023</strong>

All data is sourced from the official [KTM Komuter Timetable website](https://www.ktmb.com.my/traintime.html) up to the date of the last update mentioned above.

## How data is extracted

<sub>All conversions are made using Python! ❤️</sub>

1. Download train times in PDF format from [https://www.ktmb.com.my/traintime.html](https://www.ktmb.com.my/traintime.html).
2. Convert all the PDF files to CSV format using [Camelot](https://camelot-py.readthedocs.io/en/master/).
3. Manually check and correct the data in the CSV files, ensuring there are no trailing commas, and each train time is placed in the correct column.
4. Convert all the CSV files to JSON format using [Pandas](https://pypi.org/project/pandas/).

## Update (July 2023)

- Updated all train times to the latest schedule **(last updated: July 2023)**.
- New feature added: a switch button to toggle between "to" and "from" stations on Route page.
- Migrated the old Pages router to the new App router. [Learn more](https://nextjs.org/docs/app).
- Implemented URL parameters to store state, replacing the use of React context.
- Integrated [Camelot](https://camelot-py.readthedocs.io/en/master/) to directly convert PDF to CSV, eliminating the need for manual conversion to .docx.
- Added page descriptions, improved SEO, and UI updates.
