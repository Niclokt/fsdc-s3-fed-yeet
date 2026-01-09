# Yeet - Spending Tracker

`One or two paragraphs providing an overview of your project. Tell us about your project.`

Yeet tracks your expenditure and neatly compiles your inputs into a csv for your own further analysis when needed.
Taking expenditure tracking off your mind is just a stone's throw away - Yeet!

## Design Process

#### User Stories

`Provide us insights about your design process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.`

`In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:`

-   As a lazy and impatient tracker, I want to be able to easily input my expenditure, to track my expenditure
-   As someone who prefers the flexibility of analysing data, I want to store my expenditure records in csv format, so that it is portable and highly compatible with popular open-source analytical tools.

#### Wireframe

-   [Figma](https://www.figma.com/design/wCQPRsDgpCs8RiP1cPr8KZ/NP_S3_FED_Yeet?node-id=0-1&t=KrKzJTZxmlnLMUsX-1)

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.

### Existing Features

-   `Feature A - allows users X to achieve Y, by having them fill out Z`
-   **New Transaction Entry** – allows users to log expenditure by having them fill out the Date, Amount, Description, Source of payment, and Category via an input form.

-   **Real-time Form Validation** – allows users to ensure data completeness by having the application monitor all required fields and only enable the submission button once the form is valid.

-   **Automated Cloud Sync** – allows users to store their data permanently by having submitting the form, which triggers an asynchronous POST request to a Google Apps Script (Google Sheets) backend.

-   **Dynamic History Retrieval** – allows users to view their previous expenditure records by having the application fetch data from the Google Sheets API automatically whenever the page loads or a new entry is added.

-   **Collapsible Chronological Groups** – allows users to organize and navigate large amounts of data by having the application auto-sort transactions by month and year into expandable `<details>` sections.

-   **Visual Spending Summaries** – allows users to quickly scan individual costs by having them view transaction cards that display the amount in a large, bold font alongside the payment source and category.

-   **Custom Responsive Interface** – allows users to track transactions on any device by having the application utilize Tailwind CSS to adjust the layout from a single column on mobile to a side-by-side view on desktop.

<br>

### Features Left to Implement

-   **Total Expenditure Calculation** – allows users to see their total expendture at a glance by having the application sum up all amounts in the fetched transaction list and display it at the top of the history section.

-   **Transaction Deletion** – allows users to remove mistakes by having them click a "Delete" button on a transaction card, which sends a request to the Google Sheets API to remove that specific row.

-   **Data Filtering and Search** – allows users to find specific expenses by having them type into a search bar or select a category filter to hide transactions that don't match.

-   **Category-Based Analytics** – allows users to visualize their habits by having the application generate a pie chart (using a library like Chart.js) showing the percentage of spending on "Food" vs. "Bills."

-   **Edit Existing Transactions** – allows users to fix typos by having them click an "Edit" icon that populates the "New Transaction" form with the existing data for modification.

-   **User Authentication** – allows multiple users to have private sheets by having them log in ensuring that one person's transaction history isn't visible to everyone else using the app.

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

```
-   [JQuery](https://jquery.com)
    -   The project uses **JQuery** to simplify DOM manipulation.
```

-   [Tailwind CSS](https://tailwindcss.com/)
    -   The project uses Tailwind CSS to rapidly style the user interface using utility-first classes directly within the HTML.
-   [Google Apps Script](https://developers.google.com/apps-script)
    -   The project uses Google Apps Script as the backend server-side logic to process incoming transaction data and interface directly with Google workspace.
-   [Google Sheets API](https://developers.google.com/workspace/sheets/api/reference/rest)
    -   The project uses the Google Sheets API (via the Apps Script execution API) to read, write, and organize transaction records within a spreadsheet as a database.

## Testing

#### Test Cases

`For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:`

```
1. Contact form:

    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.
```

1. Input form:
    1. Populate all 5 fields
    2. Submit form
    3. Go to google sheets, verify that all 5 columns are populated
    4. Verify that values from the input fields are mapped and saved to the right column in Google sheets

#### Responsiveness

1. On a small/ mobile screen, cards are stacked into a single column
2. On a large / desktop screen, cards are arranged side-by-side

```
In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.
```

## Credits

-   NA

### Content

-   NA

### Media

-   NA

### Acknowledgements

-   I received inspiration for this project from UOB and HSBC's banking applications
