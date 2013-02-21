$lang_js=
new function(){

    var js=
    function( str ){
        return js.root( js.content( str ) )
    }

    js.html2text= $jam_html2text

    js.root= $lang_Wrapper( 'lang_js' )
    js.remark= $lang_Wrapper( 'lang_js_remark' )
    js.string= $lang_Wrapper( 'lang_js_string' )
    js.internal= $lang_Wrapper( 'lang_js_internal' )
    js.external= $lang_Wrapper( 'lang_js_external' )
    js.keyword= $lang_Wrapper( 'lang_js_keyword' )
    js.number= $lang_Wrapper( 'lang_js_number' )
    js.regexp= $lang_Wrapper( 'lang_js_regexp' )
    js.bracket= $lang_Wrapper( 'lang_js_bracket' )
    js.operator= $lang_Wrapper( 'lang_js_operator' )
         
    js.content=
    $lang_Parser( new function(){
    
        this[ /(\/\*[\s\S]*?\*\/)/.source ]=
        $jam_Pipe( $lang_text, js.remark )
        this[ /(\/\/[^\n]*)/.source ]=
        $jam_Pipe( $lang_text, js.remark )
        
        this[ /('(?:[^\n'\\]*(?:\\\\|\\[^\\]))*[^\n'\\]*')/.source ]=
        $jam_Pipe( $lang_text, js.string )
        this[ /("(?:[^\n"\\]*(?:\\\\|\\[^\\]))*[^\n"\\]*")/.source ]=
        $jam_Pipe( $lang_text, js.string )
        
        this[ /(\/(?:[^\n\/\\]*(?:\\\\|\\[^\\]))*[^\n\/\\]*\/[mig]*)/.source ]=
        $jam_Pipe( $lang_pcre, js.regexp )
        
        this[ /\b(_[\w$]*)\b/.source ]=
        $jam_Pipe( $lang_text, js.internal )
        
        this[ /(\$[\w$]*)(?![\w$])/.source ]=
        $jam_Pipe( $lang_text, js.external )

        this[ /\b(this|function|new|var|if|else|switch|case|default|for|in|while|do|with|boolean|continue|break|throw|true|false|void|try|catch|null|typeof|instanceof|return|delete|window|document|let|each|yield)\b/.source ]=
        $jam_Pipe( $lang_text, js.keyword )
        
        this[ /((?:\d*\.)?\d(?:[eE])?)/.source ]=
        $jam_Pipe( $lang_text, js.number )
        
        this[ /([(){}\[\]])/.source ]=
        $jam_Pipe( $lang_text, js.bracket )
        
        this[ /(\+{1,2}|-{1,2}|\*|\/|&{1,2}|\|{1,2}|={1,2}|%|\^|!)/.source ]=
        $jam_Pipe( $lang_text, js.operator )
        
    })
    
    return js
}
