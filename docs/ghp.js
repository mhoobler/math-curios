const atags = document.getElementsByTagName("a");
const url = "https://mhoobler.github.io/docs/math-curios/projects/";

Array.from(atags).forEach((e) => {
  e.setAttribute("href", url + e.id);
});
