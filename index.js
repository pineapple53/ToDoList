import express from "express";
import bodyParser from "body-parser";
import moment from "moment";



const app = express();
const port = 3000;


app.use(express.static("public"));
app.set("view engine", "ejs"); // view engine in EJS umwandeln
app.use(bodyParser.urlencoded({ extended: true }));


const arrToDo = []; // Array, um die To-Do-Liste zu speichern
// Leere Todo-Liste für "Work"
const workTodos = [];

// Dies ist der "GET"-Endpunkt für die Homepage ("/").
// Wenn jemand die Homepage besucht, wird diese Funktion aufgerufen.
// Sie rendert die "index.ejs"-Datei und überreicht das "arrToDo"-Array als "todos" an die EJS-Datei, so dass sie die To-Do-Liste anzeigen kann.
app.get("/", (req, res) => {
    const currentDate = moment().format("DD.MM.YYYY"); // Datumsformat
    res.render("index.ejs", { currentDate, todos: arrToDo, workTodos });
});

// Dies ist der "POST"-Endpunkt für das Formular auf der Homepage ("/submit").
// Wenn jemand das Formular ausfüllt und abschickt, wird diese Funktion aufgerufen.
// Sie nimmt den Inhalt des Formularfelds "todo" aus dem Anfragekörper (req.body.todo).
// Dieser Inhalt wird in der Variable "newTodo" gespeichert.
// Anschließend wird "newTodo" dem "arrToDo"-Array hinzugefügt, um die Aufgabe der To-Do-Liste hinzuzufügen.
// Schließlich wird die Seite mit res.redirect("/") neu geladen, um die aktualisierte Liste anzuzeigen.
app.post("/submit", (req, res) => {
  const newTodo = req.body.todo;
  arrToDo.push(newTodo);

  res.redirect("/");
});

app.post("/work/submit", (req, res) => {
  const newTodo2 = req.body.todo;
  workTodos.push(newTodo2); // Hier workTodos verwenden
  res.redirect("/work"); // Nach dem Hinzufügen zur "Work"-Seite zurückkehren
});

// Routen für "Heute" und "und Job to dos"
app.get("/today", (req, res) => {
  const currentDate = moment().format("DD.MM.YYYY");
  res.render("index.ejs", { currentDate, todos: arrToDo });
});

app.get("/work", (req, res) => {
  const currentDate = moment().format("DD.MM.YYYY"); 
  
  res.render("work.ejs", { currentDate, todos: workTodos });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
