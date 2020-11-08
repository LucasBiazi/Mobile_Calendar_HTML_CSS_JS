// Returns the amount of days in a month.
const amount_of_days = (year, month) => new Date(year, month + 1, 0).getDate();

// Returns the day of the week in which the month starts.
const first_day_week_for_month = (year, month) =>
  new Date(year, month, 1).getDay();

// When given the name, it returns the month number (0-11).
function month_name_in_number(month_name) {
  const month_names = [
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
  for (let i = 0; i < 12; i++) {
    return month_names.indexOf(month_name);
  }
}

// Returns a date object, with more properties.
const date_object = (date_year, date_month) => {
  const month_names = [
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

  const date_object = new Date(date_year, date_month);
  const date = {
    year: date_object.getFullYear(),
    month: date_object.getMonth(),
    month_name: month_names[date_object.getMonth()],
    amount_of_days: amount_of_days(
      date_object.getFullYear(),
      date_object.getMonth()
    ),
    get_first_Day: first_day_week_for_month(
      date_object.getFullYear(),
      date_object.getMonth()
    ),
  };
  return date;
};

// Returns a date object based on the table data.
function get_table_date() {
  const table_year = parseInt(document.getElementById("year_title").innerText);
  const table_month = month_name_in_number(
    document.getElementById("month_title").innerText
  );
  return date_object(table_year, table_month);
}

// Prints year + month on the html.
function print_year_and_month(date_year, date_month) {
  const date = date_object(date_year, date_month);
  document.getElementById("year_title").innerText = date.year;
  document.getElementById("month_title").innerText = date.month_name;
}

// Creates the table.
function create_table() {
  const table = document.getElementById("days");
  // Creates 6 rows.
  for (let i = 0; i < 6; i++) {
    let current_row = table.insertRow(1 + i);
    // Creates 7 cells.
    for (let x = 0; x < 7; x++) {
      current_row.insertCell(x);
    }
  }
}

function reset_td_classes() {
  const table = document.getElementById("days");
  for (let i = 1; i < 7; i++) {
    for (let x = 0; x < 7; x++) {
      table.rows[i].cells[x].className = "";
    }
  }
}

const change_background_color_if_weekend = (row_number) => {
  const table = document.getElementById("days");
  if (table.rows[row_number].cells[6].classList == "td") {
    table.rows[row_number].cells[6].classList.add("weekend");
  }
  if (table.rows[row_number].cells[0].classList == "td") {
    table.rows[row_number].cells[0].classList.add("weekend");
  }
};

const change_background_color_if_today = (row_number) => {
  const table = document.getElementById("days");
  const table_date_object = get_table_date();
  if (
    table_date_object.year === new Date().getFullYear() &&
    table_date_object.month === new Date().getMonth()
  ) {
    for (let i = 0; i < 7; i++) {
      if (
        table.rows[row_number].cells[i].innerText == new Date().getDate() &&
        table.rows[row_number].cells[i].className !== "other_month"
      ) {
        table.rows[row_number].cells[i].classList.add("today");
      }
    }
  } else {
    return;
  }
};

const change_background_color_if_scheduled = (row_number) => {
  const table = document.getElementById("days");
  const amount_of_items = document.querySelectorAll(
    "#data_display .data_display_item"
  ).length;
  if (amount_of_items === 0) return;
  const data_display = document.getElementById("data_display");
  let month;
  let year;
  // Get the schedules of the current month.
  for (let i = 0; i < amount_of_items; i++) {
    day = data_display.children[i].children[1].lastChild.innerText.split(
      " ",
      1
    )[0];
    month = data_display.children[i].children[1].lastChild.innerText.split(
      " ",
      2
    )[1];
    year = data_display.children[i].children[1].lastChild.innerText.split(
      " ",
      3
    )[2];
    if (year == get_table_date().year)
      if (month == month_name_in_number(get_table_date().month_name))
        for (let i = 0; i < 7; i++)
          if (
            table.rows[row_number].cells[i].innerText === day &&
            table.rows[row_number].cells[i].className !== "other_month"
          )
            table.rows[row_number].cells[i].classList.add("scheduled_day");
  }
};

// Applies the background + today style. + loads schedules
function load_table_style() {
  for (let x = 1; x < 7; x++) {
    change_background_color_if_weekend(x);
    change_background_color_if_today(x);
    change_background_color_if_scheduled(x);
  }
}

// Populates a row.
function populate_row(
  execution_number,
  row_number,
  first_cell,
  first_value,
  cell_class
) {
  if (execution_number <= 7) {
    var table = document.getElementById("days");
    for (let i = 0; i < execution_number; i++) {
      table.rows[row_number].cells[first_cell + i].innerText = first_value + i;
      table.rows[row_number].cells[first_cell + i].classList.add(cell_class);
    }
  } else {
    console.log("Alert on populate_row function.");
  }
}

// Populates the table.
function populate_table(date_year, date_month) {
  reset_td_classes();
  // AD = Amount of Days. AC = Amount of cells. CM = Current Month.
  const date = date_object(date_year, date_month);
  const AC_CM_1_row = 7 - date.get_first_Day;
  const AC_last_month = 7 - AC_CM_1_row;
  const AD_last_month = amount_of_days(date.year, date.month - 1);
  let AD_next_month = 42 - date.amount_of_days - AC_last_month;
  let day_counter = AC_CM_1_row;
  let lasting_days = date.amount_of_days - day_counter;

  // Populates the first row.
  if (AC_CM_1_row < 7) {
    populate_row(
      7 - AC_CM_1_row,
      1,
      0,
      AD_last_month - (7 - AC_CM_1_row) + 1,
      "other_month"
    );
  }
  populate_row(AC_CM_1_row, 1, date.get_first_Day, 1, "td");

  // Populates the other rows.
  let i = 2;
  while (day_counter < date.amount_of_days) {
    populate_row(7, i, 0, day_counter + 1, "td");
    day_counter += 7;
    lasting_days = date.amount_of_days - day_counter;
    i++;
    // If lasting days won't fill a whole row, fill the rest of the table.
    if (lasting_days <= 7 && lasting_days !== 0) {
      populate_row(lasting_days, i, 0, day_counter + 1, "td");
      while (AD_next_month !== 0) {
        populate_row(7 - lasting_days, i, lasting_days, 1, "other_month");
        AD_next_month -= 7 - lasting_days;
        if (AD_next_month > 0) {
          populate_row(7, i + 1, 0, 1 + (7 - lasting_days), "other_month");
          AD_next_month -= 7;
        }
      }
      day_counter = date.amount_of_days;
    }
  }
  load_table_style();
}

function previous_month() {
  let table_date = get_table_date();
  table_date.month -= 1;
  print_year_and_month(table_date.year, table_date.month);
  dislpay_schedule();
  populate_table(table_date.year, table_date.month);
}

function current_month() {
  let table_date = get_table_date();
  table_date = date_object(new Date().getFullYear(), new Date().getMonth());
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  dislpay_schedule();
  populate_table(new Date().getFullYear(), new Date().getMonth());
}

function next_month() {
  let table_date = get_table_date();
  table_date.month += 1;
  print_year_and_month(table_date.year, table_date.month);
  dislpay_schedule();
  populate_table(table_date.year, table_date.month);
}

function add_EL_close_button() {
  const exit_button = document.getElementById("close_form");
  exit_button.addEventListener("click", close_form);
}
function add_EL_confirm_button() {
  const confirm_button = document.getElementById("save_schedule");
  confirm_button.addEventListener("click", add_item);
}
function remove_EL_close_button() {
  const exit_button = document.getElementById("close_form");
  exit_button.removeEventListener("click", close_form);
}
function remove_EL_confirm_button() {
  const confirm_button = document.getElementById("save_schedule");
  confirm_button.removeEventListener("click", add_item);
}

function open_form(day, cell_class) {
  if (cell_class === "other_month")
    if (day > 14) previous_month();
    else next_month();

  const item_date = date_object(get_table_date().year, get_table_date().month);
  const pop_up = document.getElementById("add_schedule");
  pop_up.classList.remove("schedule_close");
  pop_up.classList.add("schedule_display");
  const span_message = document.getElementById("form_top_message");
  span_message.innerText = "New event on day: ";
  const span_day = document.getElementById("day");
  const span_month = document.getElementById("month");
  const span_year = document.getElementById("year");
  span_day.innerText = day;
  // Set both bellow as display:none!
  span_month.innerText = item_date.month;
  span_year.innerText = item_date.year;

  add_EL_close_button();
  add_EL_confirm_button();
}

function close_form() {
  const pop_up = document.getElementById("add_schedule");
  pop_up.classList.add("schedule_close");
  pop_up.classList.remove("schedule_display");
  remove_EL_close_button();
  remove_EL_confirm_button();
}

function change_background_if_scheduled_day(day) {
  const table = document.getElementById("days");
  for (let i = 1; i < 7; i++) {
    for (let x = 0; x < 7; x++) {
      if (
        table.rows[i].cells[x].innerText === day &&
        table.rows[i].cells[x].className !== "other_month"
      )
        table.rows[i].cells[x].classList.add("scheduled_day");
    }
  }
}

function construct_item(day, month, year) {
  // Get inputs.
  const data_display = document.getElementById("data_display");
  const input_title = document.getElementById("schedule_title");
  const input_init_time = document.getElementById("schedule_initial_time");
  const input_final_time = document.getElementById("schedule_final_time");
  const input_description = document.getElementById("schedule_description");
  // Get construction tags.
  const data_item = document.createElement("div");
  const title_div = document.createElement("div");
  const span_title = document.createElement("span");
  const span_time = document.createElement("span");
  const description_div = document.createElement("div");
  const span_description = document.createElement("span");
  const span_data_info = document.createElement("span");
  // Adding a class.
  data_item.classList.add("data_display_item");
  title_div.classList.add("data_display_div_title");
  description_div.classList.add("data_display_div_description");
  span_data_info.classList.add("data_hide_item");
  // Appending children.
  data_display.appendChild(data_item);
  data_item.appendChild(title_div);
  data_item.appendChild(description_div);
  title_div.appendChild(span_title);
  title_div.appendChild(span_time);
  description_div.appendChild(span_description);
  description_div.appendChild(span_data_info);
  // Giving the values
  span_title.innerText = "⬤ " + day + ": " + input_title.value;
  span_time.innerText = input_init_time.value + " - " + input_final_time.value;
  span_description.innerText = input_description.value;
  data_item.classList.add("data_hide_item");
  span_data_info.innerText = day + " " + month + " " + year;
  // Cleaning fields.
  input_title.value = "";
  input_init_time.value = "00:00";
  input_final_time.value = "23:59";
  input_description.value = "";
}

function dislpay_schedule() {
  const amount_of_items = document.querySelectorAll(
    "#data_display .data_display_item"
  ).length;
  if (amount_of_items === 0) return;
  const data_display = document.getElementById("data_display");
  let month;
  let year;
  // Cleaning the display_data
  for (let i = 0; i < amount_of_items; i++) {
    data_display.children[i].classList.add("data_hide_item");
    data_display.children[i].classList.remove("item_CM");
  }
  // Get the schedules of the current month.
  for (let i = 0; i < amount_of_items; i++) {
    month = data_display.children[i].children[1].lastChild.innerText.split(
      " ",
      2
    )[1];
    year = data_display.children[i].children[1].lastChild.innerText.split(
      " ",
      3
    )[2];
    if (year == get_table_date().year)
      if (month == month_name_in_number(get_table_date().month_name))
        data_display.children[i].classList.add("item_CM");
  }

  // Ascending order considering the day.
  const unordered_items = [];
  const CM_schedules = document.querySelectorAll("#data_display .item_CM");
  for (let i = 0; i < CM_schedules.length; i++) {
    unordered_items[i] = data_display.children[
      i
    ].children[0].firstChild.innerText
      .split(" ", 2)[1]
      .split(":", 1)[0];
  }
  const ordered_items = unordered_items.map((x) => parseInt(x));
  ordered_items.sort((a, b) => a - b);
  // Displaying in order!
  for (let i = 0; i < CM_schedules.length; i++)
    for (let x = 0; x < CM_schedules.length; x++) {
      if (
        CM_schedules[x].children[0].children[0].innerText
          .split(" ", 2)[1]
          .split(":", 1)[0] == ordered_items[0]
      ) {
        data_display.insertBefore(CM_schedules[x], null);
        CM_schedules[x].classList.remove("data_hide_item");
        ordered_items.splice(0, 1);
      }
    }
}

function add_item() {
  const input_title = document.getElementById("schedule_title");
  if (input_title.value !== "") {
    const span_day = document.getElementById("day").innerText;
    const span_month = document.getElementById("month").innerText;
    const span_year = document.getElementById("year").innerText;
    construct_item(span_day, span_month, span_year);
    dislpay_schedule();
    populate_table(get_table_date().year, get_table_date().month);
    close_form();
    input_title.style.borderBottom = "2px black solid";
    return;
  }
  input_title.style.borderBottom = "2px red solid";
}

function add_form_button_to_cells() {
  const table = document.getElementById("days");
  for (let i = 1; i < 7; i++) {
    for (let x = 0; x < 7; x++) {
      table.rows[i].cells[x].addEventListener("click", () => {
        open_form(
          table.rows[i].cells[x].innerText,
          table.rows[i].cells[x].className
        );
      });
    }
  }
}
// Loads today's data.
function main() {
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  create_table();
  populate_table(new Date().getFullYear(), new Date().getMonth());
}

// Loads buttons.
function load_buttons() {
  const back_button = document.getElementById("back_button");
  const t_button = document.getElementById("t_button");
  const next_button = document.getElementById("next_button");

  back_button.addEventListener("click", previous_month);
  t_button.addEventListener("click", current_month);
  next_button.addEventListener("click", next_month);
  add_form_button_to_cells();
}

// Loads main function as soon as the raw html loads.
function trigger_script() {
  document.addEventListener("DOMContentLoaded", () => {
    main();
    load_buttons();
  });
}

// Triggers the code.
trigger_script();
