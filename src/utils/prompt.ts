export function getIntegerFromPrompt(text: string, invalidText: string): number {

    const inputVal = parseInt(window.prompt(text) ?? "")

    if (isNaN(inputVal)) {
        alert(invalidText);
        throw new Error("Invalid input");
    }

    return inputVal;
}
