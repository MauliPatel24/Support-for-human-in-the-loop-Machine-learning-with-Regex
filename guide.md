
| Desc with Link | Source | state |   |   |
|---|---|---|---|---|
| [list server directory](https://stackoverflow.com/questions/27761044/list-server-directory-using-javascript-xhr)  | Source :stackoverflow  | need to test  |   |   |
|[file list in directory with XMLHttpRequest](https://www.google.com/search?q=file+list+in+directory+with+XMLHttpRequest&rlz=1C1GCEA_enUS873US873&oq=file+list+in+directory+with+XMLHttpRequest&aqs=chrome..69i57j33.20384j0j8&sourceid=chrome&ie=UTF-8)   | Google search result  | need to go through  |   |   |
|[ String.match() function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)   | MDN web docs  | useful to understand |   |   |
| [RegExp Groups and ranges](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges)  | MDN web docs  | useful to understand  |   |   |
|[Methods of RegExp and String](https://javascript.info/regexp-methods)| javscript info | useful to understand |  |  | 
|[Return positions of a regex match() in Javascript?](https://stackoverflow.com/questions/2295657/return-positions-of-a-regex-match-in-javascript) | stack overflow | useful |  |  |
|[Ajax Call](https://mkyong.com/spring-mvc/spring-4-mvc-ajax-hello-world-example/) | mkyong | useful |  |  |
|[Ajax call](https://howtodoinjava.com/ajax/complete-ajax-tutorial/)|  | tried(works) | | |
|[Ajax call Explanation](https://stackoverflow.com/questions/4112686/how-to-use-servlets-and-ajax) | stackoverflow | working |  |  |
|[Ajax call](https://beginnersbook.com/2017/07/how-to-create-and-run-servlet-in-eclipse-ide/) |  | useful |  |  |
|[exp about location of external jar file](https://stackoverflow.com/questions/4961336/i-am-getting-java-lang-classnotfoundexception-com-google-gson-gson-error-even)| stak overflow | worked |  |  |


----------------------------------------------------------------
some temp code snippet
------------------------------------------------------------------
**** code to get index of maching pattern ****

let personList = `nIs th
nis it?
monday morning hello.
monday night hi.
More than four dozen journalists at The Wall Street Journal challenged their bosses and criticized the newspaper’s opinion side in a letter that was sent to top executives on Thursday, the day after China announced that it would expel three Journal staff members in retaliation for a headline that offended the country’s leaders.
In all, 53 reporters and editors signed the letter. They criticized the newspaper’s response to the fallout from the headline, “China Is the Real Sick Man of Asia,” that went with a Feb. 3 opinion essay by Walter Russell Mead, a Journal columnist, on economic repercussions of the coronavirus outbreak.
The letter, which was reviewed by The New York Times, urged the`;

let regexpNames =  /is/mgi;
let match// = regexpNames.exec(personList);
//do {
 // console.log(match.index );
 // console.log(`Hello ${match} `);
  
//} while((match = regexpNames.exec(personList)) !== null);

while((match = regexpNames.exec(personList)) !== null){
  console.log(match.index + "--" + regexpNames.lastIndex);
  console.log(`Hello ${match} `);
}
