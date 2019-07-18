import autocomplete from "autocompleter";
import "autocompleter/autocomplete.css";

function updateWard(ward) {
  window.location.href = `/wards/${ward}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const address = document.getElementById("address");
  const addrCtrl = document.querySelector(".control.address");
  const select = document.getElementById("ward");

  if (!address) return;

  let addrNum = "";
  let addresses = [];

  autocomplete({
    input: address,
    emptyMsg: "No addresses found",
    minLength: 2,
    debounceWaitMs: 150,
    fetch: (input, update) => {
      const inputAddr = input.split(" ")[0].replace(/[^0-9]/g, "");
      // Replace non alpha as well as trailing directionals (i.e. SOUTH becomes S)
      const matchAddr = input.replace(/[^a-z0-9 ]/gmi, "")
        .toUpperCase()
        .replace(/\s+/g, " ")
        .replace(/(\d+ [nsew])([a-z]+)(.*)/gi, "$1$3")
        .trim();
      if (addrNum === inputAddr && addresses.length > 0) {
        update(addresses.filter((addr) => addr.label.startsWith(matchAddr)).slice(0, 5));
      } else {
        addrNum = inputAddr;
        return fetch(`https://hasmyaldermanbeenindicted.com/addresses/${addrNum}.json`)
          .then((res) => res.json())
          .then((res) => {
            addresses = Object.keys(res).map((addr) => ({value: res[addr].ward, label: addr}));
            return addresses.filter((addr) => addr.label.startsWith(matchAddr))
              .slice(0, 5);
          }).then(update)
          .catch((res) => console.error(res));
      }
    },
    onSelect: (result) => {
      address.value = result.label;
      select.value = result.value;
      updateWard(result.value);
    },
    customize: function(input, inputRect, container, maxHeight) {
      container.style.position = "absolute";
      container.style.width = "100%";
      container.style.left = "0";
      container.style.right = "0";
      container.style.top = "auto";
      addrCtrl.appendChild(container);
    },
  });

  select.addEventListener("change", (e) => {
    updateWard(e.target.value);
  });

  document.querySelector("#address + .delete").addEventListener("click", () => {
    address.value = "";
  });
});
