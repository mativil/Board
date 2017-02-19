/**
 * Created by Ivan on 18.02.2017.
 */
function paintAnotherOne(dataArray)
{
    for(i in dataArray)
    {
        var item = dataArray[i];
        console.log(item);
        switch (item.type)
        {
            case "START":

                context.moveTo(item.x, item.y);
                break;
            case "MOVE":
                context.lineTo(item.x, item.y);
                context.stroke();
                break;
            default: break;
        }
    }
}