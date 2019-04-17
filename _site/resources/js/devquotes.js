Date.prototype.getDOY = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - onejan) / 86400000);
}

function fetchQuote() {
	var quotes = [
  {
    "text": "To build Renaissance, just run `tools/sbt/bin/sbt assembly`.",
    "author": "",
    "description": ""
  },
  {
    "text": "Renaissance benchmarks run in a single JVM process, which makes them convenient to use with profilers, instrumenters and other analysis tools.",
    "author": "",
    "description": ""
  },
  {
    "text": "Renaissance has a comprehensive set of command-line options -- type `-h` to see them.",
    "author": "",
    "description": ""
  },
  {
    "text": "To see all the available benchmarks, use the `--list` flag.",
    "author": "",
    "description": ""
  },
  {
    "text": "You can inject custom measurements to Renaissance benchmarks by implementing your own `Plugin` class.",
    "author": "",
    "description": ""
  },
  {
    "text": "You can select different ways of running the benchmarks using the `--policy` flag.",
    "author": "",
    "description": ""
  }
]

;
	var today = new Date();
	var day = today.getDOY() + 2;
	var index = day % quotes.length;
	return quotes[index];
}
