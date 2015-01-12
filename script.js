$(document).ready(function () {

    var inputResultForm = $('#inputResultForm');
    var inputResultButton = $('#inputResultButton');

    var checkTab = $('.checkTab');
    var setupTab = $('.setupTab');
    var setupButton = $('#setupButton');
    var checkButton = $('#checkButton');

    var rightAnswer = $('#rightAnswer');
    var taskToDo = $('#taskToDo');

    var okHeader = $('#okHeader');
    var errorHeader = $('#errorHeader');
    var okValue1 = $('#okValue1');
    var errorValue2 = $('#errorValue2');
    var quantityValue3 = $('#quantityValue3');
    var qualityValue4 = $('#qualityValue4');


    var mathObj = {
        answer: 0,
        realResult: 0,
        resString: "",
        resultGood: 0,
        resultBad: 0,
        pressedOnce: true,
        quantity: function () {
            quantityValue3.html(this.resultGood + this.resultBad);
            return Math.round(this.resultGood / (this.resultGood + this.resultBad) * 100) + "%";
        },
        clearResult: function () {
            this.resultGood = 0;
            this.resultBad = 0;
            this.pressedOnce = true;
            okValue1.html(0);
            errorValue2.html(0);
            quantityValue3.html(0);
            qualityValue4.html("100%");
            inputResultForm.val("");
            rightAnswer.html("");
            okHeader.html("Правильно");
            errorHeader.html('Ошибка');
        }
    };

    var mathType = [true, false, true, false];

    setupButton.click(function () {
        checkTab.hide();
        setupTab.show();
        inputResultButton.val("Следующий");
        mathObj.clearResult();
    });

    checkButton.click(function () {
        checkTab.show();
        setupTab.hide();
        inputResultForm.focus();
        if (mathObj.pressedOnce) {
            inputResultButton.val("Проверить");
            showTask();
            mathObj.pressedOnce = false;
        }
    });

    inputResultForm.keypress(function (e) {
        if (e.which == 13) {
            mathObj.answer = +inputResultForm.val();
            if (isNumeric(mathObj.answer)) {
                inputResultButton.val("Следующий");
                checkValue();
                showTask();
                inputResultForm.val("");
            } else rightAnswer.html("<strong>Внимание!</strong> Ввод только целых натуральных чисел!");
        } else if (!(e.which == 8 || e.which == 44 || e.which == 45 || e.which == 46 || (e.which > 47 && e.which < 58))) return false;
    });

    inputResultButton.click(function () {
        mathObj.answer = +inputResultForm.val();
        if (isNumeric(mathObj.answer)) {
            inputResultButton.val("Следующий");
            checkValue();
            showTask();
            inputResultForm.val("");
        } else rightAnswer.html("<strong>Внимание!</strong> Ввод только целых натуральных чисел!");
        inputResultForm.focus();
    });

    $("#sum").on("click", function () {
        mathType[0] =  $(this).is(":checked");
    });
    $("#sub").on("click", function () {
        mathType[1] =  $(this).is(":checked");
    });
    $("#mul").on("click", function () {
        mathType[2] =  $(this).is(":checked");
    });
    $("#div").on("click", function () {
        mathType[3] =  $(this).is(":checked");
    });

    function randomizeTypeOfMath(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    function isNumeric(n) {
        return ((n >= 0) && ((n ^ 0) === n));
    }

    function showTask() {
        if (mathType[0] || mathType[1] || mathType[2] || mathType[3]) {

            var a = randomizeTypeOfMath(1, 9);
            var b = randomizeTypeOfMath(1, 9);
            var c;

            do {
                i = randomizeTypeOfMath(0, 3);
            }
            while (!mathType[i]);

            switch (i) {
                case 0:
                    mathObj.realResult = a + b;
                    mathObj.resString = a + " + " + b;
                    taskToDo.html("Задание: <strong>" + mathObj.resString + "</strong> = ?");
                    break;
                case 1:
                    if (a < b) {
                        c = a;
                        a = b;
                        b = c;
                    }
                    mathObj.realResult = a - b;
                    mathObj.resString = a + " - " + b;
                    taskToDo.html("Задание: <strong>" + mathObj.resString + "</strong> = ?");
                    break;
                case 2:
                    mathObj.realResult = a * b;
                    mathObj.resString = a + " &#215 " + b;
                    taskToDo.html("Задание: <strong>" + mathObj.resString + "</strong> = ?");
                    break;
                case 3:
                    if (a < b) {
                        c = a;
                        a = b;
                        b = c;
                    }
                    mathObj.realResult = a / b | 0;
                    mathObj.resString = a + " &#247 " + b;
                    taskToDo.html("Задание: <strong>" + mathObj.resString + "</strong> = ?");
                    break;
            }

        } else taskToDo.html("<strong>Выберите тип примеров!</strong>");
    }

    function checkValue() {
        if (mathType[0] || mathType[1] || mathType[2] || mathType[3]) {
            if (mathObj.answer == mathObj.realResult) {
                mathObj.resultGood++;
                okValue1.html(mathObj.resultGood);
                okHeader.html("<strong>Правильно</strong>");
                errorHeader.html("Ошибка");
            } else {
                mathObj.resultBad++;
                errorValue2.html(mathObj.resultBad);
                okHeader.html("Правильно");
                errorHeader.html("<strong>Ошибка</strong>");
            }
            qualityValue4.html(mathObj.quantity());
            rightAnswer.html("Ответ на прошлое задание: " + mathObj.resString + " = <strong>" + mathObj.realResult + "</strong>");
        }
    }
});