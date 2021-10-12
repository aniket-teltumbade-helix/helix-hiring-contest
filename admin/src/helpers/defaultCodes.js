exports.pythonScript =
  "if __name__==\"__main__\":\r\n\r\n    ''' stdin '''\r\n    T=input();\r\n\r\n    ''' stdout '''\r\n    print(\"Hello,\",T,\"!\");\r\n"
exports.jscript =
  "process.stdin.resume();\r\nprocess.stdin.setEncoding('ascii');\r\nvar stdin = '';\r\n\r\nprocess.stdin.on('data', function (data) {\r\n    stdin += data.toString();\r\n})\r\n\r\nprocess.stdin.on('end', function () {\r\n    process.stdout.write(\"Hello, \" + stdin + \"!\")\r\n})\r\n"
exports.javaCode =
  'import java.util.*;\r\npublic class Solution {\r\n    public static void main(String args[]){\r\n        /**** to get inputs ****/\r\n        Scanner scan = new Scanner(System.in);\r\n        String a="";\r\n        while(scan.hasNext()) {\r\n            a=scan.next();\r\n        }\r\n\r\n        /**** to print output ****/\r\n        System.out.println("Hello, " + a + "!");\r\n    }\r\n}'
exports.cCode =
  '#include <limits.h>\r\n#include <stdio.h>\r\nint main(){\r\n    /**** to get inputs ****/\r\n\tchar name[20];\r\n\tfgets(name, sizeof(name), stdin);\r\n\t\r\n    /**** to print output ****/\r\n\tprintf("Hello, %s!",&name);\r\n\treturn (0);\r\n}'
exports.cppCode =
  '#include <iostream>\r\nusing namespace std;\r\n\r\nint main()\r\n{\r\n    /*** to get inputs ***/    \r\n    char input[100];\r\n    cin >> input;\r\n\t\r\n    /*** to get output ***/\r\n    cout << "Hello, "<< input<<"!";     \r\n\r\n    return 0;\r\n}'
exports.phpCode =
  '<?php\r\n/* Inputs */\r\n$input = fgets(STDIN);\r\n/* Outputs */\r\n$output = "Hello, ".$input."!";\r\nfwrite(STDOUT,$output);\r\n?>\r\n'
