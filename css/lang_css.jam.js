$lang_css=
new function(){
    
    var css=
    function( str ){
        return css.root( css.stylesheet( str ) )
    }
    
    css.html2text= $jam_html2text

    css.root= $lang_Wrapper( 'lang_css' )
    css.remark= $lang_Wrapper( 'lang_css_remark' )
    css.string= $lang_Wrapper( 'lang_css_string' )
    css.bracket= $lang_Wrapper( 'lang_css_bracket' )
    css.selector= $lang_Wrapper( 'lang_css_selector' )
    css.tag= $lang_Wrapper( 'lang_css_tag' )
    css.id= $lang_Wrapper( 'lang_css_id' )
    css.klass= $lang_Wrapper( 'lang_css_class' )
    css.pseudo= $lang_Wrapper( 'lang_css_pseudo' )
    css.property= $lang_Wrapper( 'lang_css_property' )
    css.value= $lang_Wrapper( 'lang_css_value' )
    
    css.stylesheet=
    $lang_Parser( new function( ){
        
        this[ /(\/\*[\s\S]*?\*\/)/.source ]=
        $jam_Pipe( $lang_text, css.remark )
        
        this[ /(\*|(?:\\[\s\S]|[\w-])+)/.source ]=
        $jam_Pipe( $lang_text, css.tag )
        
        this[ /(#(?:\\[\s\S]|[\w-])+)/.source ]=
        $jam_Pipe( $lang_text, css.id )
        
        this[ /(\.(?:\\[\s\S]|[\w-])+)/.source ]=
        $jam_Pipe( $lang_text, css.klass )
        
        this[ /(::?(?:\\[\s\S]|[\w-])+)/.source ]=
        $jam_Pipe( $lang_text, css.pseudo )
        
        this[ /\{([\s\S]+?)\}/.source ]=
        new function( ){
            var openBracket= css.bracket( '{' )
            var closeBracket= css.bracket( '}' )
            return function( style ){
                style= css.style( style )
                return openBracket + style + closeBracket
            }
        }             
    })
    
    css.style=
    $lang_Parser( new function( ){
            
        this[ /(\/\*[\s\S]*?\*\/)/.source ]=
        $jam_Pipe( $lang_text, css.remark )
        
        this[ /([\w-]+\s*:)/.source  ]=
        $jam_Pipe( $lang_text, css.property )
        
        this[ /([^:]+?(?:;|$))/.source ]=
        $jam_Pipe( $lang_text, css.value )
        
    })
    
    return css
}
