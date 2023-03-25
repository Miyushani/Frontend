getAllStudents();
function saveStudent(){

    let name=$('#exampleFormControlInput2').val();
    let address=$('#exampleFormControlInput3').val();
        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8090/student/saveStudent",
            async:true,
            data:JSON.stringify({
                "studentsId":"",
                "name":name,
                "address":address,
            }),
            success: function (data) {
                alert("saved")
                getAllStudents()
            },
            error: function (xhr, exception) {
                alert("Error")
            }
        })

    }
function updateStudent(){
    let studentsId=$('#exampleFormControlInput1').val();
    let name=$('#exampleFormControlInput2').val();
    let address=$('#exampleFormControlInput3').val();

    $.ajax({
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8090/student/updateStudent",
        async:true,
        data:JSON.stringify({
            "studentsId":studentsId,
            "name":name,
            "address":address,
        }),
        success: function (data) {
            alert("Updated")
            getAllStudents()
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    })

}
function deleteStudent(){
    let studentsId=$('#exampleFormControlInput1').val();

    $.ajax({
        method:"DELETE",
        url:"http://localhost:8090/student/deleteStudent/"+studentsId,
        async:true,
        success: function (data) {
            alert("Deleted")
            getAllStudents()
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    })

}

function getAllStudents(){

    $.ajax({
        method:"GET",
        url:"http://localhost:8090/student/getAllStudents",
        async:true,
        success: function (data) {
            if (data.code==="00"){
                $('#stuTable').empty();
                for (let stu of data.content){
                    let studentsId=stu.studentsId
                    let name=stu.name
                    let address=stu.address


                    var row=`<tr><td>${studentsId}</td><td>${name}</td><td>${address}</td></tr>`;
                    $('#stuTable').append(row);
                }
            }
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    })

}

$(document).ready(function () {
    $(document).on('click', '#stuTable tr', function () {
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();

        $('#exampleFormControlInput1').val(col0);
        $('#exampleFormControlInput2').val(col1);
        $('#exampleFormControlInput3').val(col2);

    })
})

