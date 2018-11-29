# vim 退格键（backspace）不能用

set nocompatible

set backspace=indent,eol,start

indent：如果用了 `:set indent`，`:set ai` 等自动缩进，想用退格键将字段缩进删掉，必须设置这个选项，否则不响应。
eol：如果插入模式下在行首，想通过退格键合并两行，需要设置 eol。
start：要想删除此次插入前的输入，需设置 start。