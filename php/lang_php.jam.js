$lang_php=
new function( ){

    var php=
    function( str ){
        return php.root( php.content( str ) )
    }

    php.html2text= $jam_html2text

    php.root= $lang_Wrapper( 'lang_php' )
    php.dollar= $lang_Wrapper( 'lang_php_dollar' )
    php.variable= $lang_Wrapper( 'lang_php_variable' )
    php.string= $lang_Wrapper( 'lang_php_string' )
    php.number= $lang_Wrapper( 'lang_php_number' )
    php.func= $lang_Wrapper( 'lang_php_func' )
    php.keyword= $lang_Wrapper( 'lang_php_keyword' )
    
    php.content=
    $lang_Parser( new function(){
        
        this[ /\b(true|false|null|NULL|__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|for|foreach|function|global|gotoif|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|__CLASS__|__DIR__|__FILE__|__FUNCTION__|__LINE__|__METHOD__|__NAMESPACE__|__TRAIT__)\b/.source ]=
        $jam_Pipe( $lang_text, php.keyword )
        
        this[ /(\$)(\w+)\b/.source ]=
        function( dollar, variable ){
            dollar= $lang_php.dollar( dollar )
            variable= $lang_php.variable( variable )
            return dollar + variable
        }
        
        this[ /(\w+)(?=\s*\()/.source ]=
        php.func
        
        this[ /('(?:[^\n'\\]*(?:\\\\|\\[^\\]))*[^\n'\\]*')/.source ]=
        this[ /("(?:[^\n"\\]*(?:\\\\|\\[^\\]))*[^\n"\\]*")/.source ]=
        $jam_Pipe( $lang_text, php.string )
        
        this[ /((?:\d*\.)?\d(?:[eE])?)/.source ]=
        $jam_Pipe( $lang_text, php.number )
        
    })
    
    return php
}
