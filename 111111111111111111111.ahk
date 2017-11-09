;打開Tim(QQ)
#q::run C:\Program Files (x86)\Tencent\TIM\Bin\QQScLauncher.exe

;打開計算器
#v::run calc.exe

;打開瀏覽器
#g::run https://www.google.com

;郵件
#o::run OUTLOOK.EXE

;sublime
!1::run D:\Program Files\Sublime Text 3\sublime_text.exe

;VS CODE
!2::run D:\Program Files (x86)\Microsoft VS Code\Code.exe

;PHOTO SHOP
!3::run C:\Program Files\Adobe\Adobe Photoshop CC 2014\Photoshop.exe

;有道
!e::run C:\Users\yosyuan\AppData\Local\youdao\dict\Application\YoudaoDict.exe

;Filezilla
#+^f::
run C:\Program Files\FileZilla FTP Client\filezilla.exe
return

;CONTENT MANAGER
#+^c::
run  C:\Users\yosyuan\AppData\Roaming\Microsoft\Windows\Content Manager
return

::/dd::
d = %A_YYYY%-%A_MM%-%A_DD%
;获得系统时间比如今天的时间：2007-10-21。如果需要“年”的话请替换上面的“-”。
clipboard = %d%
;把 d 的值发送到剪贴板，变量是不用声明的，想引用变量的值，就在变量的前后加“%”。第二行的变量是 AHK 自带的变量。
Send ^v
return

#f::run C:\Program Files\Everything\Everything.exe

#c::
MouseGetPos, mouseX, mouseY
; 获得鼠标所在坐标，把鼠标的 X 坐标赋值给变量 mouseX ，同理 mouseY
PixelGetColor, color, %mouseX%, %mouseY%, RGB
; 调用 PixelGetColor 函数，获得鼠标所在坐标的 RGB 值，并赋值给 color
StringRight color,color,6
; 截取 color（第二个 color） 右边的 6 个字符，因为获得的值是这样的：#RRGGBB，一般我们只需要 RRGGBB 部分。把截取到的值再赋给 color（第一个 color）。
clipboard = %color%
; 把 color 的值发送到剪贴板
return

#t::
InputBox, time, 煎蛋牌泡面专用计时器, 请输入一个时间（单位是秒）
; 弹出一个输入框，标题是“煎蛋牌泡面专用计时器”，内容是“请输入一个时间（单位是秒）”
time := time*1000
; 如果一个变量要做计算的话，一定要像这样写，和平常的算式相比，多了一个冒号。sleep 的时间是按照千分之一秒算的，这里乘以 1000 就变成秒了。
Sleep,%time%
MsgBox 水开拉
return