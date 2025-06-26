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

Last updated: <strong>June 2025</strong>

All data is sourced from the official [KTM Komuter Timetable website](https://www.ktmb.com.my/traintime.html) up to the date of the last update mentioned above.

## Extracting Data

### Pre-requisites

- [uv](https://github.com/astral-sh/uv)
- [Python 3](https://docs.astral.sh/uv/guides/install-python/)

### Installation

1. `cd` into the `python` directory.

    ```bash
    cd python
    ```

1. Run the following command to create a virtual environment and install the required packages:

    ```bash
    uv venv
    source .venv/bin/activate
    uv pip install -r requirements.txt
    ```

### Steps

1. Download train times in PDF format from [https://www.ktmb.com.my/traintime.html](https://www.ktmb.com.my/traintime.html).

1. Name the downloaded PDF accordingly and place them in the `pdf` directory.

1. Convert all the PDF files to CSV format using [Camelot](https://camelot-py.readthedocs.io/en/master/).

    ```bash
    uv python pdf_to_csv.py
    ```

1. Manually split, rename, check and correct the generated data in the CSV files, ensuring there are no trailing commas, and each train time is placed in the correct column.

1. Convert all the CSV files to JSON format using [Pandas](https://pypi.org/project/pandas/).

    ```bash
    uv python csv_to_json.py
    ```

## Changelog

### Update (June 2025)

- Updated all train times to the latest schedule **(last updated: June 2025)**.
- Upgrade app to Next.js 15, React 19, and Tailwind CSS v4.

### Update (July 2023)

- Updated all train times to the latest schedule **(last updated: July 2023)**.
- New feature added: a switch button to toggle between "to" and "from" stations on Route page.
- Migrated the old Pages router to the new App router. [Learn more](https://nextjs.org/docs/app).
- Implemented URL parameters to store state, replacing the use of React context.
- Integrated [Camelot](https://camelot-py.readthedocs.io/en/master/) to directly convert PDF to CSV, eliminating the need for manual conversion to .docx.
- Added page descriptions, improved SEO, and UI updates.
