$lang_Parser=
function( map ){
    if( !map[ '' ] ) map[ '' ]= $lang_text
    return $jam_Pipe
    (   $jam_Parser( map )
    ,   $jam_Concater()
    )
}
