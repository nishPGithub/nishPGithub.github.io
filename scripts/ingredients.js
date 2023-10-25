const urlParams = new URLSearchParams(window.location.search);
const sheetTitle = urlParams.get("recipe");

async function listIngredients(sheetTitle) {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1SRMRrV8817I1jQlDqpR0M0qYQMqwo16VxyJ6Z18XmNQ",
            range: `${sheetTitle}!A2:C`,
        });
    } catch (err) {
        console.error(err.message);
        return;
    }

    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.log("No values found.");
        return;
    }

    const ingredientsList = document.querySelector(".ingredientsList");
    range.values.forEach((row) => {
        const li = document.createElement("li");
        li.textContent = row[0];
        li.className = "ingredientsListItem";
        ingredientsList.appendChild(li);
    });
}
