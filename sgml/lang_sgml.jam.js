$lang_sgml=
new function(){

    var sgml=
    function( str ){
        return sgml.root( sgml.content( str ) )
    }

    sgml.html2text= $jam_html2text

    sgml.root= $lang_Wrapper( 'lang_sgml' )
    sgml.tag= $lang_Wrapper( 'lang_sgml_tag' )
    sgml.tagBracket= $lang_Wrapper( 'lang_sgml_tag-bracket' )
    sgml.tagName= $lang_Wrapper( 'lang_sgml_tag-name' )
    sgml.attrName= $lang_Wrapper( 'lang_sgml_attr-name' )
    sgml.attrValue= $lang_Wrapper( 'lang_sgml_attr-value' )
    sgml.comment= $lang_Wrapper( 'lang_sgml_comment' )
    sgml.decl= $lang_Wrapper( 'lang_sgml_decl' )
    
    sgml.tag=
    $jam_Pipe
    (   $lang_Parser( new function(){
        
            this[ /^(<\/?)([a-zA-Z][\w:-]*)/.source ]=
            function( bracket, tagName ){
                return sgml.tagBracket( $lang_text( bracket ) ) + sgml.tagName( tagName )
            } 
            
            this[ /(\s)([sS][tT][yY][lL][eE])(\s*=\s*)(")([\s\S]*?)(")/.source ]=
            this[ /(\s)([sS][tT][yY][lL][eE])(\s*=\s*)(')([\s\S]*?)(')/.source ]=
            function( prefix, name, sep, open, value, close ){
                name= sgml.attrName( name )
                value= sgml.attrValue( open + $lang_css.style( value ) + close )
                return prefix + name + sep + value
            }

            this[ /(\s)([oO][nN]\w+)(\s*=\s*)(")([\s\S]*?)(")/.source ]=
            this[ /(\s)([oO][nN]\w+)(\s*=\s*)(')([\s\S]*?)(')/.source ]=
            function( prefix, name, sep, open, value, close ){
                name= sgml.attrName( name )
                value= sgml.attrValue( open + $lang_js( value ) + close )
                return prefix + name + sep + value
            }

            this[ /(\s)([a-zA-Z][\w:-]+)(\s*=\s*)("[\s\S]*?")/.source ]=
            this[ /(\s)([a-zA-Z][\w:-]+)(\s*=\s*)('[\s\S]*?')/.source ]=
            function( prefix, name, sep, value ){
                name= sgml.attrName( $lang_text( name ) )
                value= sgml.attrValue( $lang_text( value ) )
                return prefix + name + sep + value
            }
        
        })
    ,   $lang_Wrapper( 'lang_sgml_tag' )
    )

    sgml.content=
    $lang_Parser( new function(){
    
        this[ /(<!--[\s\S]*?-->)/.source ]=
        $jam_Pipe( $lang_text, sgml.comment )
        
        this[ /(<![\s\S]*?>)/.source ]=
        $jam_Pipe( $lang_text, sgml.decl )
        
        this[ /(<[sS][tT][yY][lL][eE][^>]*>)([\s\S]+?)(<\/[sS][tT][yY][lL][eE]>)/.source ]=
        function( prefix, content, postfix ){
            prefix= $lang_sgml.tag( prefix )
            postfix= $lang_sgml.tag( postfix )
            content= $lang_css( content )
            return prefix + content + postfix
        }
        
        this[ /(<[sS][cC][rR][iI][pP][tT][^>]*>)([\s\S]+?)(<\/[sS][cC][rR][iI][pP][tT]>)/.source ]=
        function( prefix, content, postfix ){
            prefix= $lang_sgml.tag( prefix )
            postfix= $lang_sgml.tag( postfix )
            content= $lang_js( content )
            return prefix + content + postfix
        }
        
        this[ /(<[^>]+>)/.source ]=
        sgml.tag
        
    })
    
    return sgml
}
