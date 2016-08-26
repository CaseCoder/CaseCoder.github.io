var opName = '';
var enteredVal = NaN;
var storedVal = NaN;
var clearOnNumber = true;
var forceEnterNumber = false;

function resetCalc()
{
	opName = '';
	enteredVal = 0;
	storedVal = NaN;
	clearOnNumber = true;
	forceEnterNumber = false;
	$('.calc-display').val(enteredVal);	
}

function main()
{
	resetCalc();
	$('.calc-key-num').click(function() {
		var display = $('.calc-display');
		var currentVal = display.val();
		if(clearOnNumber)
		{
			currentVal = '0';
			clearOnNumber = false;
		}
		forceEnterNumber = false;
		if(currentVal.length > 11)
		{
			return;
		}		
		var num = $(this).text();
		if((num === '.') && (~currentVal.toString().indexOf('.')))
		{
			// Skip second dot
			return;
		}
		if((currentVal.length === 1) && (currentVal[0] === '0') && (num !== '.'))
		{
			currentVal = num.toString();			
		}
		else
		{
			currentVal += num.toString();
		}
		display.val(currentVal);
	});

	$('.calc-key-operation').click(function() {
		var currentOpName = $(this).text();
		if(currentOpName === 'C')
		{
			resetCalc();
			return;
		}

		if(!clearOnNumber)
		{
			var currentVal = +($('.calc-display').val());
			if(isNaN(currentVal))
			{
				currentVal = 0;
			}
			enteredVal = +currentVal;
		}

		if(isNaN(storedVal))
		{
			switch(currentOpName)
			{
				case '':
					// '=' is pressed
					break;
				case '+':
				case '*':
					storedVal = enteredVal;
					storedVal = trimFloat(storedVal);
					break;
				case '-':
					storedVal = -enteredVal;
					storedVal = trimFloat(storedVal, 12);
					$('.calc-display').val(storedVal);
					break;
				case '/':
					storedVal = 1 / enteredVal;
					storedVal = trimFloat(storedVal);
					$('.calc-display').val(storedVal, 12);
					break;
				default:
					$('.calc-display').val('ERROR: unknown operation.');
					return;
			}
			clearOnNumber = true;
		}
		else
		{
			if ((currentOpName === '=') || (currentOpName !== opName))
			{
				forceEnterNumber = true;
			}
			if((currentOpName === '=') || !forceEnterNumber)
			{
				switch(opName)
				{
					case '+':
						storedVal += enteredVal;
						break;
					case '*':
						storedVal *= enteredVal;
						break;
					case '-':
						storedVal -= enteredVal;
						break;
					case '/':
						storedVal /= enteredVal;
						break;
					default:
						$('.calc-display').val('ERROR: unknown operation.');
						return;
				}
			}
			storedVal = trimFloat(storedVal, 12);
			$('.calc-display').val(storedVal);
			clearOnNumber = true;
		}

		if(currentOpName !== '=')
		{
			opName = currentOpName;
		}
	});
}

$(document).ready(main);

function trimFloat(number, length)
{
		var decimalIndex = number.toString().indexOf('.');
		if(~decimalIndex)
		{
			var strResult = number.toString();
			if(decimalIndex > length - 1)
			{
				strResult = strResult.substring(0, decimalIndex);
			}
			else
			{
				strResult = strResult.substring(0, 11);
			}
			return +strResult;
		}
		return number;

}