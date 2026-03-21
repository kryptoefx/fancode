async function loadMatches() {
  const res = await fetch("data.json");
  const data = await res.json();

  let html = "";

  data.forEach(match => {
    html += `
      <div class="match">
        <div class="title">${match.title}</div>
        <div class="status">${match.status}</div>

        ${
          match.link
            ? `<a class="watch" href="${match.link}" target="_blank">Watch</a>`
            : ""
        }
      </div>
    `;
  });

  document.getElementById("app").innerHTML = html;
}

loadMatches();
