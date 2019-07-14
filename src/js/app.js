import autocomplete from "autocompleter";
import "autocompleter/autocomplete.css";

function updateWard(ward) {
  window.location.href = `/wards/${ward}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const address = document.getElementById("address");
  const select = document.getElementById("ward");

  if (!address) return;

  autocomplete({
    input: address,
    emptyMsg: "No addresses found",
    minLength: 2,
    debounceWaitMs: 150,
    fetch: (input, update) => fetch(`http://hasmyaldermanbeenindicted.com.s3-website-us-east-1.amazonaws.com/addresses/${input.split(" ")[0]}.json`)
      .then((res) => res.json())
      .then((res) => Object.keys(res)
        .map((addr) => ({value: res[addr].ward, label: addr}))
        .filter((addr) => addr.label.toLowerCase().startsWith(input.toLowerCase()))
        .slice(0, 10))
      .then(update)
      .catch((res) => console.error(res)),
    onSelect: (result) => {
      address.value = result.label;
      select.value = result.value;
      updateWard(result.value);
    },
  });

  select.addEventListener("change", (e) => {
    updateWard(e.target.value);
  });
});
