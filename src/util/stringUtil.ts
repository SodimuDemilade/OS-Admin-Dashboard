export class StringUtil {
    static toTitleCase(sentence: string) {
        // Split the input string into sentences
        const words = sentence?.split(" ");

        // Capitalize the first letter of each sentence
        const titleCase = words?.map((word) => {
            // Capitalize the first letter of the sentence
            const firstLetter = word.charAt(0).toUpperCase();
            // Concatenate the capitalized first letter with the rest of the word
            return firstLetter + word.slice(1).toLowerCase();
        });
        // Join the sentences back together with a period and space
        const result = titleCase.join(" ");
        // console.log(result);
        return result;
    }

    static convertToSentenceCase(input: string): string {
        input = String(input)
        // Check if the input is in camelCase or snake_case format
        const isCamelCase = /[a-z][A-Z]/.test(input);
        const isSnakeCase = /_/.test(input);

        if (!isCamelCase && !isSnakeCase) {
            return this.toTitleCase(input); // Return the original string if it isn't camelCase or snake_case
        }

        let result = input;

        // Convert snake_case to spaces
        if (isSnakeCase) {
            result = result.replace(/_/g, ' ');
        }

        // Convert camelCase to spaces
        if (isCamelCase) {
            result = result.replace(/([a-z])([A-Z])/g, '$1 $2');
        }

        // Capitalize the first letter of the sentence
        result = result.replace(/^./, str => str.toUpperCase());

        return this.toTitleCase(result);
    }

    static spaceAfterEveryNletter(input: string, n = 4): string {
        if (!input) return input;
        // Remove any existing spaces from the input
        const cleanedInput = input.replace(/\s+/g, '');

        // Initialize an array to hold the parts
        const parts = [];

        // Loop through the input string and slice it into chunks of n characters
        for (let i = 0; i < cleanedInput.length; i += n) {
            parts.push(cleanedInput.slice(i, i + n));
        }

        // Join the parts with a space and return the formatted string
        return parts.join(' ');
    }

    static abbreviateToTwoCharacter(word: string): string {
        if (StringUtil.isStringNullOrEmpty(word)) {
            return ""
        }
        const trimmedWord = word.trim();
        const formattedWord = trimmedWord.slice(0, trimmedWord.indexOf(" ")) + trimmedWord.slice(trimmedWord.lastIndexOf(" "));
        // if (word.trim().split(" ").filter((x) => x.trim() != "").length > 1) {
        //     return `${word.split(" ").filter((x) => x.trim() != "")[0][0]}${word.split(" ").filter((x) => x.trim() != "")[1][0]}`.toUpperCase();
        // }
        if (formattedWord.length > 1) {
            if (formattedWord.split(" ").length > 1)
                return `${formattedWord.split(" ")[0][0]}${formattedWord.split(" ")[formattedWord.split(" ").length - 1][0]}`.toUpperCase()
            return `${formattedWord[0]}${formattedWord[1]}`.toUpperCase();
        } else if (formattedWord.length === 1) {
            return `${formattedWord[0]}`.toUpperCase();
        } else {
            return "";
        }
    }

    static formatCurrency(amount: string, currency: string = "NGN"): string {
        const currencyOptions: Intl.NumberFormatOptions = {
            style: "currency",
            currency: currency, // Replace with your desired currency code (e.g., 'EUR', 'GBP')
            minimumFractionDigits: 2, // Minimum number of decimal places
        };
        const currencyFormatter = new Intl.NumberFormat("en-US", currencyOptions); // Replace 'en-US' with the appropriate locale
        return currencyFormatter.format(Number(amount)).replace("NGN", "₦").trim();
    }

    static removeNonDigits(input: string): string {
        return input.replace(/\D/g, "");
    }

    static insertSpaces(input: string): string {
        return input.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
    }

    static formatPhoneNumber(input: string): string {
        // Remove any non-digit characters and prepend country code
        const formatted = `+${input.replace(/\D/g, "")}`;

        // Insert spaces between groups of digits
        return formatted.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
    }

    static formatValue(value: string) {
        // Convert the value to string and slice from 3 to 14
        let slicedValue = value.toString().slice(3, 14);

        // Check if the first character of the sliced value is not '0'
        if (slicedValue.charAt(0) !== '0') {
            // If the first character is not '0', add '0' at the beginning
            slicedValue = '0' + slicedValue;
        }

        return slicedValue;
    }

    static handleCurrencyFormatter = (amount: string) => {
        amount = amount.toString()
        amount = this?.formatAmount(amount);
        amount = isNaN(parseFloat(amount)) ? "" : amount;
        return amount;
        //       let value = amount[amount.length - 1];
        //     if (amount.toLowerCase().includes("clear")) {
        //       // Clear the amount
        //       if (amount.length <= 1) amount = "0.00";
        //       else amount = amount.slice(0, -1);
        //   }
        //   else if (value === "." && !amount.includes(".")) {
        //     // Add decimal point if it's not already present
        //     amount += value;
        // }

        //        else if (value !== ".") {
        //           if (amount.includes(".") && amount.slice(amount.indexOf(".") + 1).length >= 2) return;
        //           // Append other digits
        //           if (amount === "0") {
        //               amount = value;
        //           } else {
        //               amount += value;
        //           }
        //       }
        //       // Format the new amount with commas
        //       const formattedAmount: string = this.formatAmount(amount);

        //       // Update the state with the formatted amount
        //       return formattedAmount;
    };

    static formatAmount = (amount: string): string => {
        // Remove commas and convert to number for easier manipulation
        // let numericAmount = parseFloat(amount);
        if (!amount) return amount;
        const numericAmount = parseFloat(amount?.replace(',', ""));
        if (amount?.endsWith(".")) return numericAmount?.toLocaleString("en-US") + ".";
        if (amount?.includes(".") && this?.countOccurrences(amount, ".") == 1) {
            const [amountInt, amountDecimal] = amount.split(".");
            const formattedAmountInt = this?.formatAmount(amountInt);
            return formattedAmountInt + "." + amountDecimal;
        }
        if (amount?.includes(".")) {
            return amount;
            // Format with commas
        }
        // Format with commas
        return numericAmount?.toLocaleString("en-US");
    };

    static countOccurrences(mainStr: string, subStr: string) {
        // Initialize count
        let count = 0;

        // Loop through the string to find occurrences
        let index = mainStr.indexOf(subStr);
        while (index !== -1) {
            // If substring is found, increase count and move to the next index
            count++;
            index = mainStr.indexOf(subStr, index + 1);
        }

        return count;
    }


    static fromStringToNumber = (stringAmount: string) => {
        return parseFloat(stringAmount.replace(/,/g, ""));
    };


    static isStringNullOrEmpty = (string: string | null) => {
        if (string == null) {
            return true;
        }
        return string == "";

    };


    static shortenWord(word: string, replace: string = "...", length: number = 28): string {
        return word.length >= length
            ? word.replace(/(\r\n|\n|\r)/gm, "").slice(0, length) + replace
            : word.replace(/(\r\n|\n|\r)/gm, "")

    }
}
