function getPhonePrefix() {
    const dropdownToggle = document.querySelector(".prefix-dropdown_toggle");
    const dropdownList = document.querySelector(".prefix-dropdown_list");
    const dropdownListWrapper = document.querySelector(".prefix-dropdown_list-wrapper");
    const hiddenInput = document.querySelector("input[name='countryCode']");
    const phoneCodeDisplay = dropdownToggle.querySelector("[data-element='value']");
    const flagDisplay = dropdownToggle.querySelector("img.prefix-dropdown_flag");

    dropdownToggle.addEventListener("click", (e) => {
        dropdownListWrapper.classList.add("w--open");

    });
    // Fetch countries data from REST API
    const fetchCountries = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const countries = await response.json();
            populateDropdown(countries);
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    };

    // Populate the dropdown with countries
    const populateDropdown = (countries) => {
        countries.forEach((country) => {
            const countryCode = country.cca2;
            const countryFlag = country.flags.svg;
            const countryPrefix = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : "");

            if (countryPrefix) {
                const dropdownItem = document.createElement("a");
                dropdownItem.href = "#";
                dropdownItem.classList.add("prefix-dropdown_item"); // Updated class
                dropdownItem.innerHTML = `
                    <img src="${countryFlag}" alt="${country.name.common} Flag" class="prefix-dropdown_flag"/>
                    <div data-element="value">${countryCode}</div>
                `;

                // Handle country selection
                dropdownItem.addEventListener("click", (e) => {
                    e.preventDefault();
                    selectCountry(countryFlag, `${countryPrefix}`, countryCode);
                });

                dropdownList.appendChild(dropdownItem);
            }
        });
    };

    // Handle country selection
    const selectCountry = (flagUrl, prefix, code) => {
        // Update the flag and phone prefix in the dropdown toggle
        flagDisplay.src = flagUrl;
        phoneCodeDisplay.textContent = prefix;

        // Update the hidden input with the country code
        hiddenInput.value = code;

        // Close the dropdown after selection
        // const isOpen = dropdownListWrapper.classList.remove("w--open");

        dropdownListWrapper.classList.remove("w--open");
    };

    fetchCountries();

};
// Initialize the dropdown component
getPhonePrefix();
