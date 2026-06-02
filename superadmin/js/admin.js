<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Super Admin Dashboard</title>

<link rel="stylesheet" href="css/admin.css">
</head>

<body>

<header>

<div class="logo-area">
<h2>Prince Computers</h2>
<span>Garhi Birbal</span>
</div>

<div class="admin-area">
Super Admin |
<button class="logout-btn" onclick="logout()">
    Logout
</button>
</div>

</header>

<div class="main-container">

<nav class="sidebar">

<ul>
<li>Dashboard</li>
<li>Pending Users</li>
<li>Approved Users</li>
<li>Rejected Users</li>
<li>User Search</li>
<li>Reports</li>
<li>Settings</li>
</ul>

</nav>

<section class="content">

<h2>Pending User Approval</h2>

<table>

<thead>
<tr>

<th>User ID</th>
<th>Name</th>
<th>Mobile</th>
<th>KO Code</th>
<th>Username</th>
<th>User Type</th>
<th>Status</th>
<th>Bank Name</th>
<th>Account No</th>
<th>IFSC</th>
<th>Action</th>

</tr>
</thead>

<tbody id="userTableBody">

</tbody>

<button class="approve-btn">
Approve
</button>

<button class="reject-btn">
Reject
</button>

<button class="modify-btn">
Modify
</button>

</td>

</tr>

<tbody id="userTableBody">

</tbody>

</table>

</section>

</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script src="js/admin.js"></script>

</body>
</html>



    Swal.fire(
        "Rejected",
        "User Rejected",
        "warning"
    );
