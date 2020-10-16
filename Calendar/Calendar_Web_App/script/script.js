// Returns the day of the week in which the month starts.
starting_day = (year, month) => new Date(year, month, 1).getDay();

// Returns the amount of days in a month.
total_month_days = (year, month) => new Date(year, month + 1, 0).getDate();

// Set the background color of the cell that contains today's day.
function is_today(months, cell) {
  if (
    new Date().getFullYear() ==
      parseInt(document.getElementById("year_title").textContent) &&
    months[new Date().getMonth()].month ==
      document.getElementById("month_title").textContent &&
    cell.textContent == new Date().getDate()
  ) {
    cell.style.background = "rgba(255, 160, 122, 0.8)";
  }
}

// Changes color if it is a weekend.
color_weekend = (let_value, cell) => {
  if (let_value == 6 || let_value == 0) cell.style.color = "lightsalmon";
};

// Populates the DB.
function load_DB(year, month) {
  let counter = 1;
  const table = document.getElementById("days");
  const date_object = new Date(year, month);

  // Array containing months names, starting_day()_+ total_month_days().
  const months = [
    {
      // Month 0
      month: "January",
      first_day: starting_day(date_object.getFullYear(), 0),
      days: Array(total_month_days(date_object.getFullYear(), 0)),
    },
    {
      // Month 1
      month: "February",
      first_day: starting_day(date_object.getFullYear(), 1),
      days: Array(total_month_days(date_object.getFullYear(), 1)),
    },
    {
      // Month 2
      month: "March",
      first_day: starting_day(date_object.getFullYear(), 2),
      days: Array(total_month_days(date_object.getFullYear(), 2)),
    },
    {
      // Month 3
      month: "April",
      first_day: starting_day(date_object.getFullYear(), 3),
      days: Array(total_month_days(date_object.getFullYear(), 3)),
    },
    {
      // Month 4
      month: "May",
      first_day: starting_day(date_object.getFullYear(), 4),
      days: Array(total_month_days(date_object.getFullYear(), 4)),
    },
    {
      // Month 5
      month: "June",
      first_day: starting_day(date_object.getFullYear(), 5),
      days: Array(total_month_days(date_object.getFullYear(), 5)),
    },
    {
      // Month 6
      month: "July",
      first_day: starting_day(date_object.getFullYear(), 6),
      days: Array(total_month_days(date_object.getFullYear(), 6)),
    },
    {
      // Month 7
      month: "August",
      first_day: starting_day(date_object.getFullYear(), 7),
      days: Array(total_month_days(date_object.getFullYear(), 7)),
    },
    {
      // Month 8
      month: "September",
      first_day: starting_day(date_object.getFullYear(), 8),
      days: Array(total_month_days(date_object.getFullYear(), 8)),
    },
    {
      // Month 9
      month: "October",
      first_day: starting_day(date_object.getFullYear(), 9),
      days: Array(total_month_days(date_object.getFullYear(), 9)),
    },
    {
      // Month 10
      month: "November",
      first_day: starting_day(date_object.getFullYear(), 10),
      days: Array(total_month_days(date_object.getFullYear(), 10)),
    },
    {
      // Month 11
      month: "December",
      first_day: starting_day(date_object.getFullYear(), 11),
      days: Array(total_month_days(date_object.getFullYear(), 11)),
    },
  ];

  // Prints the name of the current month and year.
  document.getElementById("year_title").textContent = date_object.getFullYear();
  document.getElementById("month_title").textContent =
    months[date_object.getMonth()].month;

  // Month days that will appear in the first row.
  const number_of_cells_in_the_first_row =
    7 - months[date_object.getMonth()].first_day;

  // Month days that will appear after the first row.
  let normal_days = number_of_cells_in_the_first_row + 1;

  // Creates + populates the 5 last rows.
  for (let r = 0; r < 5; r++) {
    let row = table.insertRow(r + 1);
    let cell;
    // Creates + populates 7 cells in each row.
    for (let x = 0; x < 7; x++) {
      cell = row.insertCell(x);
      cell.textContent = normal_days;
      is_today(months, cell);
      color_weekend(x, cell);
      normal_days++;
      // Filling the rest of the table with the days of the next month(gray days).
      if (normal_days > months[date_object.getMonth()].days.length + 1) {
        // Next month days are always lowlighted.
        if (x == 6 || x == 0) cell.style.color = "rgba(175, 175, 175, 0.45)";
        cell.textContent = counter++;
        cell.className = "other_month";
      }
    }
  }

  // Creates + populates the 1 row.
  for (let i = 0; i < 1; i++) {
    let row = table.insertRow(i + 1);
    let cell;
    let number_of_blank_cells = 7 - number_of_cells_in_the_first_row;
    // Populates it.
    for (let y = 0; y < number_of_cells_in_the_first_row; y++) {
      cell = row.insertCell(0);
      cell.textContent = number_of_cells_in_the_first_row - y;
      is_today(months, cell);
      color_weekend(y, cell);
    }
    // Filling the rest of the table (next month days).
    for (let w = 0; w < number_of_blank_cells; w++) {
      cell = row.insertCell(0);
      if (months[date_object.getMonth() - 1]) {
        cell.textContent = months[date_object.getMonth() - 1].days.length--;
        cell.className = "other_month";
      } else {
        cell.textContent = months[date_object.getMonth() + 11].days.length--;
        cell.className = "other_month";
      }
    }
  }
}

// Converts the month name to the month number (January = 0).
function identify_month(string) {
  const all_months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let i = 0;
  while (string != all_months[i]) {
    i++;
  }
  return i;
}

// Advancecs a month.
function advance_month(year, month) {
  // Cleaning table.
  const table = document.getElementById("days");
  for (let i = 0; i < 6; i++) {
    table.deleteRow(1);
  }
  // Add new data.
  month++;
  load_DB(year, month);
}

// Retreats a month.
function retreat_month(year, month) {
  // Cleaning table.
  const table = document.getElementById("days");
  for (let i = 0; i < 6; i++) {
    table.deleteRow(1);
  }
  month--; // Add new data.
  load_DB(year, month);
}
