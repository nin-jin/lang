this.$lang_tags=
new function(){
        
        var tags=
        function( str ){
            return tags.root( tags.content( str ) )
        }
        
        tags.html2text= $jam_html2text
        
        tags.root= $lang_Wrapper( 'lang_tags' )
        tags.item= $lang_Wrapper( 'lang_tags_item' )
        
        tags.content=
        $lang_Parser( new function(){
        
            this[ /^(\s*?)([^\n\r]+)(\s*?)$/.source ]=
            function( open, text, close ){
                return open + '<a href="?gist/list/' + $jam_htmlEscape( text ) + '">' + tags.item( text ) + '</a>' + close
            }
            
        })
        
        return tags
}
