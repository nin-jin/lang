$lang_md=
new function(){

    var md=
    function( str ){
        return md.root( md.content( str ) )
    }
    
    md.html2text= function( text ){
        return $jam_html2text
        (   text
            .replace( /<h1[^>]*>/gi, '\n!!! ' )
            .replace( /<h2[^>]*>/gi, '\n!!  ' )
            .replace( /<h[3-7][^>]*>/gi, '\n!   ' )
            .replace( /<\/?code[^>]*>/gi, '' )
            .replace( /<pre[^>]*>([\s\S]+?)<\/pre>/gi, function( str, code ){
                console.log( code )
                return '\n#   text\n    ' + code.replace( /[\r\n]+$/, '' ).replace( /\n/g, '\n    ' )  + '\n'
            })
            .replace( /<a wc_link="true"[^>]*>/gi, '' )
            .replace( /<a[^>]* href="([^">]+)"[^>]*>([\s\S]*?)<\/a>/gi, function( str, link, text ){
                if( !text ) return str
                if( text === link ) text= ''
                return '[' + text + '\\' + link + ']'
            })
            .replace( /<li[^>]*>/gi, '\n    • ' )
            .replace( /<p[^>]*>/gi, '\n    ' )
            .replace( /<\/(h[1-6]|p|li)>/gi, '\n' )
        )
    }

    md.root= $lang_Wrapper( 'lang_md' )

    md.header1= $lang_Wrapper( 'lang_md_header-1' )
    md.header2= $lang_Wrapper( 'lang_md_header-2' )
    md.header3= $lang_Wrapper( 'lang_md_header-3' )
    md.header4= $lang_Wrapper( 'lang_md_header-4' )
    md.header5= $lang_Wrapper( 'lang_md_header-5' )
    md.header6= $lang_Wrapper( 'lang_md_header-6' )
    md.headerMarker= $lang_Wrapper( 'lang_md_header-marker' )

    md.pros= $lang_Wrapper( 'lang_md_pros' )
    md.cons= $lang_Wrapper( 'lang_md_cons' )
    md.disputes= $lang_Wrapper( 'lang_md_disputes' )
    
    md.marker= $lang_Wrapper( 'lang_md_marker' )
    
    md.quote= $lang_Wrapper( 'lang_md_quote' )
    md.quoteMarker= $lang_Wrapper( 'lang_md_quote-marker' )

    md.quoteInline= $lang_Wrapper( 'lang_md_quote-inline' )
    md.quoteInlineMarker= $lang_Wrapper( 'lang_md_quote-inline-marker' )

    md.image= $lang_Wrapper( 'lang_md_image' )
    md.imageHref= $lang_Wrapper( 'lang_md_image-href' )

    md.embed= $lang_Wrapper( 'lang_md_embed' )
    md.embedHref= $lang_Wrapper( 'lang_md_embed-href' )

    md.link= $lang_Wrapper( 'lang_md_link' )
    md.linkMarker= $lang_Wrapper( 'lang_md_link-marker' )
    md.linkTitle= $lang_Wrapper( 'lang_md_link-title' )
    md.linkHref= $lang_Wrapper( 'lang_md_link-href' )

    md.author= $lang_Wrapper( 'lang_md_author' )
    md.indent= $lang_Wrapper( 'lang_md_indent' )

    md.escapingMarker= $lang_Wrapper( 'lang_md_escaping-marker' )

    md.emphasis= $lang_Wrapper( 'lang_md_emphasis' )
    md.emphasisMarker= $lang_Wrapper( 'lang_md_emphasis-marker' )

    md.strong= $lang_Wrapper( 'lang_md_strong' )
    md.strongMarker= $lang_Wrapper( 'lang_md_strong-marker' )

    md.super= $lang_Wrapper( 'lang_md_super' )
    md.superMarker= $lang_Wrapper( 'lang_md_super-marker' )

    md.sub= $lang_Wrapper( 'lang_md_sub' )
    md.subMarker= $lang_Wrapper( 'lang_md_sub-marker' )

    md.math= $lang_Wrapper( 'lang_md_math' )
    md.remark= $lang_Wrapper( 'lang_md_remark' )

    md.table= $lang_Wrapper( 'lang_md_table' )
    md.tableRow= $lang_Wrapper( 'lang_md_table-row' )
    md.tableCell= $lang_Wrapper( 'lang_md_table-cell' )
    md.tableMarker= $lang_Wrapper( 'lang_md_table-marker' )

    md.code= $lang_Wrapper( 'lang_md_code' )
    md.codeMarker= $lang_Wrapper( 'lang_md_code-marker' )
    md.codeLang= $lang_Wrapper( 'lang_md_code-lang' )
    md.codePath= $lang_Wrapper( 'lang_md_code-path' )
    md.codeMeta= $lang_Wrapper( 'lang_md_code-meta' )
    md.codeContent= $lang_Wrapper( 'lang_md_code-content' )

    md.html= $lang_Wrapper( 'lang_md_html' )
    md.htmlTag= $lang_Wrapper( 'lang_md_html-tag' )
    md.htmlContent= $lang_Wrapper( 'lang_md_html-content' )

    md.para= $lang_Wrapper( 'lang_md_para' )

    md.inline=
    $lang_Parser( new function(){

        // indentation
        // ^\s+
        this[ /^(\s+)/.source ]=
        md.indent
        
        // math
        //  123 
        this[ /([0-9∅‰∞∀∃∫√×±≤+−≥≠<>%])/.source ]=
        md.math
        
        // hlight off
        // ``
        this[ /(`)(.+?)(`)/.source ]=
        function( open, text, close ){
            return md.escapingMarker( open ) + text + md.escapingMarker( close )
        }
        
        // escaping
        // ** // ^^ __ [[ ]]
        this[ /(\*\*|\/\/|\^\^|__|\[\[|\]\]|``|\\\\)/.source ]=
        function( symbol ){
            return md.escapingMarker( symbol[0] ) + symbol[1]
        }
    
        // hyper link
        // [title;http://example.org/]
        this[ /(\[)(.*?)(\\)((?:https?|ftps?|mailto|magnet):[^\0]*?|[^:]*?(?:[\/\?].*?)?)(\])/.source ]=
        function( open, title, middle, href, close ){
            var uri= href
            open= md.linkMarker( open )
            middle= md.linkMarker( middle )
            close= md.linkMarker( close )
            href= title ? md.linkHref( href ) : md.linkTitle( href )
            title= md.linkTitle( md.inline( title ) )
            return md.link( '<a wc_link="true" href="' + $jam_htmlEscape( uri ) + '">' + open + title + middle + href + close + '</a>' )
        }
        
        // image
        // [url]
        //this[ /(\[)([^\[\]]+)(\])/.source ]=
        //function( open, href, close ){
        //    return md.image( md.imageHref( open + href + close ) + '<a wc_link="true" href="' + $jam_htmlEscape( href ) + '"><object data="' + $jam_htmlEscape( href ) + '"></object></a>' )
        //}
        
        // emphasis
        // /some text/
        this[ /([^\s"({[]\/)/.source ]=
        $lang_text
        this[ /(\/)([^\/\s](?:[\s\S]*?[^\/\s])?)(\/)(?=[\s,.:;!?")}\]]|$)/.source ]=
        function( open, content, close ){
            open = md.emphasisMarker( open )
            close = md.emphasisMarker( close )
            content= md.inline( content )
            return md.emphasis( open + content + close )
        }
    
        // strong
        // *some text*
        this[ /([^\s"({[]\*)/.source ]=
        $lang_text            
        this[ /(\*)([^\*\s](?:[\s\S]*?[^\*\s])?)(\*)(?=[\s,.:;!?")}\]]|$)/.source ]=
        function( open, content, close ){
            open = md.strongMarker( open )
            close = md.strongMarker( close )
            content= md.inline( content )
            return md.strong( open + content + close )
        }
    
        // ^super text^
        this[ /(\^)([^\^\s](?:[\s\S]*?[^\^\s])?)(\^)(?=[\s,.:;!?")}\]√_]|$)/.source ]=
        function( open, content, close ){
            open = md.superMarker( open )
            close = md.superMarker( close )
            content= md.inline( content )
            return md.super( open + content + close )
        }
    
        // _sub text_
        this[ /(_)([^_\s](?:[\s\S]*?[^_\s])?)(_)(?=[\s,.:;!?")}\]\^]|$)/.source ]=
        function( open, content, close ){
            open = md.subMarker( open )
            close = md.subMarker( close )
            content= md.inline( content )
            return md.sub( open + content + close )
        }
    
        // "inline quote"
        // «inline quote»
        this[ /(")([^"\s](?:[\s\S]*?[^"\s])?)(")(?=[\s,.:;!?)}\]]|$)/.source ]=
        this[ /(«)([\s\S]*?)(»)/.source ]=
        function( open, content, close ){
            open = md.quoteInlineMarker( open )
            close = md.quoteInlineMarker( close )
            content= md.inline( content )
            return md.quoteInline( open + content + close )
        }
    
        // remark
        // (some text)
        this[ /(\()([\s\S]+?)(\))/.source ]=
        function( open, content, close ){
            content= md.inline( content )
            return md.remark( open + content + close )
        }

    })

    md.content=
    $lang_Parser( new function(){

        // header
        // !!! Title
        this[ /^(!!! )(.*?)$/.source ]=
        function( marker, content ){
            return md.header1( md.headerMarker( marker ) + md.inline( content ) )
        }
        // !!  Title
        this[ /^(!!  )(.*?)$/.source ]=
        function( marker, content ){
            return md.header2( md.headerMarker( marker ) + md.inline( content ) )
        }
        // !   Title
        this[ /^(!   )(.*?)$/.source ]=
        function( marker, content ){
            return md.header3( md.headerMarker( marker ) + md.inline( content ) )
        }
        
        // +   Pros
        this[ /^(\+   )(.*?)$/.source ]=
        function( marker, content ){
            return md.pros( md.marker( marker ) + md.inline( content ) )
        }
        // −   Cons
        this[ /^(−   )(.*?)$/.source ]=
        function( marker, content ){
            return md.cons( md.marker( marker ) + md.inline( content ) )
        }
        // ±   Disputes 
        this[ /^(±   )(.*?)$/.source ]=
        function( marker, content ){
            return md.disputes( md.marker( marker ) + md.inline( content ) )
        }
        
        // block quote
        // >   content
        this[ /^(>   )(.*?)$/.source ]=
        function( marker, content ){
            marker = md.quoteMarker( marker )
            content= md.inline( content )
            return md.quote( marker + content )
        }
        
        // video
        // http://www.youtube.com/watch?v=IGfTPIVb0jQ
        // http://youtu.be/IGfTPIVb0jQ
        this[ /^(http:\/\/www\.youtube\.com\/watch\?v=)(\w+)(.*$\n?)/.source ]=
        this[ /^(http:\/\/youtu.be\/)(\w+)(.*$\n?)/.source ]=
        function( prefix, id, close ){
            var href= md.embedHref( prefix + id + close )
            var uri= 'http://www.youtube.com/embed/' + id
            var embed= md.embed( '<wc_aspect wc_aspect_ratio=".75"><iframe class="wc_lang_md_embed-object" src="' + uri + '" allowfullscreen></iframe></wc_aspect>' )
            return href + embed
        }
        
        // image
        // http://gif1.ru/gifs/267.gif
        this[ /^((?:[\?\/\.]|https?:|ftps?:|data:).*?)(?:(\\)((?:[\?\/\.]|https?:|ftps?:|data:).*?))?$(\n?)/.source ]=
        function( src, middle, link, close ){
            var prolog= md.embedHref( src + ( middle || '' ) + ( link || '' ) + close )
            //url= url.replace( /\xAD/g, '' ) TODO: перенсти в редактор в onpaste
            var embed= md.embed( '<a wc_link="true" href="' + $jam_htmlEscape( link || src ) + '"><img src="' + $jam_htmlEscape( src ) + '" /></a>' )
            return prolog + embed
        }
    
        // table
        // --
        // | cell 11 | cell 12
        // --
        // | cell 21 | cell 22
        this[ /((?:\n--(?:\n[| ] [^\n]*)*)+)/.source ]=
        function( content ){
            var rows= content.split( /\n--/g )
            rows.shift()
            for( var r= 0; r < rows.length; ++r ){
                var row= rows[ r ]
                var cells= row.split( /\n\| /g )
                cells.shift()
                for( var c= 0; c < cells.length; ++c ){
                    var cell= cells[ c ]
                    cell= cell.replace( /\n  /g, '\n' )
                    cell= md.inline( cell )
                    cell= cell.replace( /\n/g, '\n' + md.tableMarker( '  ' ) )
                    cell= md.tableMarker( '\n| ' ) + cell 
                    cells[ c ]= md.tableCell( cell )
                }
                row= cells.join( '' )
                var rowSep= '<lang_md_table-row-sep><wc_lang-md_table-cell colspan="300">\n--</wc_lang-md_table-cell></lang_md_table-row-sep>'
                rows[ r ]= rowSep + md.tableRow( row )
            }
            content= rows.join( '' )

            return md.table( content )
        }
        
        // source code
        // #lang
        //     some code
        this[ /^(#   )([^\n\r]*[\. ])?([\w-]+)((?:\n    [^\n]*)*)(?=\n|$)/.source ]=
        function( marker, path, lang, content ){
            content= content.replace( /\n    /g, '\n' )
            content= $lang( lang )( content )
            content= content.replace( /\n/g, '\n' + md.indent( '    ' ) )
            content= md.codeContent( content )
            marker= md.codeMarker( marker )
            path= path ? md.codePath( path ) : ''
            lang= md.codeLang( lang )
            return md.code( marker + md.codeMeta( path + lang ) + content )
        }
        
        // simple paragraph
        this[ /^(    .*)$/.source ]=
        function( content ){
            return md.para( md.inline( content ) )
        }
        
    })
    
    return md
} 
