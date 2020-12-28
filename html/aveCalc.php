<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<title>CubingTime Average Calculator</title>
		<link rel="stylesheet" type="text/css" href="../css/toolStyle.css"/>
	</head>	
	
	<body>
	  <div class="NavBar">
            <ul id="NavUl">
              <li><a id="active" href="../index.html">Home</a></li>
              <li class='Dropdown'>
                <a class='DropdownBtn' href="cfop.html">CFOP Method</a> <div class='DropdownContent'>
                  <a href="cross.html">Cross</a>
                  <a href="f2l.html">F2L</a>
                  <a href="oll.html">OLL</a>
                  <a href="pll.html">PLL</a>
                </div>
              </li>
              <li class='Dropdown'>
                <a class='DropdownBtn' href="tools.html">Tools</a>
                <div class='DropdownContent'>
                  <a href="aveCalc.php">Average Calculator</a>
                  <a href="timer.html">Rubik Timer</a>
                  <a href="metronome.html">Metronome</a>
                </div>
              </li>
            </ul>
	  </div>

		<div class="wrapper">
			<h1>Average of 5 Calculator</h1>
			<div class="formDiv">
				<form action="#" method="post">
					Solve 1: <input class="textInput" type="text" name="solve1" required="required" value="<?php echo htmlspecialchars($_POST['solve1']); ?>" />
					<br />
					Solve 2: <input class="textInput" type="text" name="solve2" required="required" value="<?php echo htmlspecialchars($_POST['solve2']); ?>"/>
					<br />
					Solve 3: <input class="textInput" type="text" name="solve3" required="required" value="<?php echo htmlspecialchars($_POST['solve3']); ?>"/>
					<br />
					Solve 4: <input class="textInput" type="text" name="solve4" required="required" value="<?php echo htmlspecialchars($_POST['solve4']); ?>"/>
					<br />
					Solve 5: <input class="textInput" type="text" name="solve5" required="required" value="<?php echo htmlspecialchars($_POST['solve5']); ?>"/>
					<br />
					<input id="submitBtn" type="submit" value="Calculate" name="submit_button"/>
				</form>
			</div>
		
<?php
	# This function takes in an array of number and return the SPECIAL average of 5
	function calcAvg5($valArray): float
	{
		# Sum everything in the array
		$sum3 = array_sum($valArray);
		
		# Remove the min and maxx value form sum
		$sum3 -= min($valArray);
		$sum3 -= max($valArray);
		
		# return the average
		return $sum3 / 3;
	} # end calcAvg5

	# Check and see if the input is a valid number, Ex: 12.345, 123, 12466, 12.4, 12.45
	function validNum($number)
	{
		return preg_match("/^\d*(\.\d{0,3})?$/", $number);
	}	
	
	# If some of the 5 is not valid, print the error message
	if (!validNum($_POST[solve1]) || !validNum($_POST[solve2]) || !validNum($_POST[solve3]) || !validNum($_POST[solve4]) || !validNum($_POST[solve5]))
	{
?>	
		<h3 id="invalid">INVALID INPUT!</h3>
<?php }
	# If valid input, calculate the average and print result
	else
	{
?>
		<h3>Average of 5:</h3>
			
<?php
	
		$allVal = array($_POST[solve1], $_POST[solve2], $_POST[solve3], $_POST[solve4], $_POST[solve5]);
?>
		<h2 id="result"><?php echo round(calcAvg5($allVal), 2) ?></h2>

<?php
	}// end else
?>
	
		</div>
	</body>
</html>
