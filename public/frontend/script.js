function aziz()
{
  var a1 = document.getElementById("first_value").value
  var a = parseFloat(a1)
  var b1 = document.getElementById("second_value").value
  var b = parseFloat(b1)
  var sign = document.getElementById("sign").value
  if (a == a1 && b == b1 || a == a1 && sign == "sqrt" || a == a1 && sign == "2")
  {
    if (sign == "+")
    {
      var c = a + b;
      alert(c)
    }
    else if (sign == "-")
    {
      var c = a - b;
      alert(c)
    }
    else if (sign == "*")
    {
      var c = a * b;
      alert(c)
    }
     else if (sign == "/")
    {
      if (b == 0)
      {
        alert("Error")
      }
      else
      {
        var c = a / b;
        alert(c)
      }
    }
    else if (sign == "%")
    {
      var c = (a * 100) / b;
      alert(c);
    }
    else if (sign == "/?")
    {
      if (a % b == 0)
      {
        alert("Yes")
      }
      else
      {
        alert("No")
      }
    }
    else if (sign == "sqrt")
    {
      var c = Math.sqrt(a)
      alert(c)
    }
    else if (sign == "2")
    {
      var c = a * a;
      alert(c);
    }
    else if (sign == "n")
    {
      var c = 1;
      for (var i = 0; i < b; i++)
      {
        c *= a;
      }
      alert(c);
    }
    else
    {
      alert("Please choose a sign")
    }
  }
  else
  {
    alert("Insert a numbers please")
  }
}
