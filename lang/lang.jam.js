this.$lang=
function( name ){
    return this[ '$lang_' + name ] || $lang_text
}

$lang_text= function( text ){
    return $jam_htmlEscape( text )
}

$lang_text.html2text= $jam_html2text
