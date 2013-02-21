$lang_pcre=
new function(){

    var pcre=
    function( str ){
        return pcre.root( pcre.content( str ) )
    }

    pcre.html2text= $jam_html2text

    pcre.root= $lang_Wrapper( 'lang_pcre' )
    pcre.backslash= $lang_Wrapper( 'lang_pcre_backslash' )
    pcre.control= $lang_Wrapper( 'lang_pcre_control' )
    pcre.spec= $lang_Wrapper( 'lang_pcre_spec' )
    pcre.text= $lang_Wrapper( 'lang_pcre_text' )
    
    pcre.content=
    $lang_Parser( new function(){
    
        this[ /\\([\s\S])/.source ]=
        new function( ){
            var backslash= pcre.backslash( '\\' )
            return function( symbol ){
                return backslash + pcre.spec( $lang_text( symbol ) )
            }
        }

        this[ /([(){}\[\]$*+?^])/.source ]=
        $jam_Pipe( $lang_text, pcre.control )
        
    })
    
    return pcre
}
