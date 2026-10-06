import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom'

import './App.css'

function Home() {
  const [backendMessage, setBackendMessage] = useState('')

useEffect(() => {
  fetch('http://localhost:8080/api/hello')
    .then(response => response.text())
    .then(data => setBackendMessage(data))
    .catch(error => console.error('Backend error:', error))
}, [])
  const navigate = useNavigate()

  return (
    
    <div className="app">
      <header className="navbar">
        <h2>Wardenly</h2>
        <span>Your hostel, handled.</span>
        <p>{backendMessage}</p>
      </header>

      <main className="hero">
        <div className="hero-text">
          <p className="tagline">SMART HOSTEL MANAGEMENT</p>

          <h1>
            Everything your hostel
            <br />
            needs. <span>In one place.</span>
          </h1>

          <p className="description">
            Manage complaints, leaves, mess, notices, attendance and
            housekeeping without the usual hostel chaos.
          </p>

          <div className="login-buttons">
            <button
              className="primary-button"
              onClick={() => navigate('/student-login')}
            >
              Student Login
            </button>

            <button
  className="secondary-button"
  onClick={() => navigate('/warden-login')}
>
  Warden Login
</button>

            <button
              className="secondary-button"
              onClick={() => alert('Admin login coming soon')}
            >
              Admin Login
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <span>Wardenly</span>
            <span>● Online</span>
          </div>

          <h3>Good evening 👋</h3>
          <p>Here's what's happening in your hostel.</p>

          <div className="dashboard-grid">
            <div className="dashboard-item">
              <strong>🍛</strong>
              <span>Mess</span>
              <small>Dinner at 7:30 PM</small>
            </div>
            

            <div className="dashboard-item">
              <strong>🔧</strong>
              <span>Complaints</span>
              <small>2 active</small>
            </div>

            <div className="dashboard-item">
              <strong>🚪</strong>
              <span>Leave</span>
              <small>1 pending</small>
            </div>

            <div className="dashboard-item">
              <strong>📢</strong>
              <span>Notices</span>
              <small>3 new</small>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function WardenLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setError('')

    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password.')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      )

      if (!response.ok) {
        throw new Error('Invalid email or password')
      }

      const user = await response.json()

      if (user.role !== 'WARDEN') {
        setError('This account is not a warden account.')
        return
      }

      localStorage.setItem('user', JSON.stringify(user))

      navigate('/warden-dashboard')

    } catch (error) {
      console.error('Login error:', error)
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <p className="tagline">WARDEN LOGIN</p>

        <h1>Welcome back</h1>

        <p className="description">
          Manage your hostel from one place.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            className="primary-button"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}
function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <Navigate to="/" />
  }

  if (user.role !== role) {
    return <Navigate to="/" />
  }

  return children
}
function StudentLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setError('')

    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password.')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      )

      if (!response.ok) {
        throw new Error('Invalid email or password')
      }

      const user = await response.json()

      if (user.role !== 'STUDENT') {
        setError('This account is not a student account.')
        return
      }

      localStorage.setItem('user', JSON.stringify(user))

      navigate('/student-dashboard')

    } catch (error) {
      console.error('Login error:', error)
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <p className="tagline">STUDENT LOGIN</p>

        <h1>Welcome back</h1>

        <p className="description">
          Log in to manage your hostel life.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            className="primary-button"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

function StudentDashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/')}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <p className="tagline">STUDENT DASHBOARD</p>

        <h1>Welcome back 👋</h1>

        <p className="description">
          Here's everything you need to manage your hostel life.
        </p>

        <div className="feature-grid">
          <div
            className="feature-card"
            onClick={() => navigate('/complaints')}
          >
            <span>🔧</span>
            <h3>Complaints</h3>
            <p>Report and track hostel issues.</p>
          </div>

          <div
  className="feature-card"
  onClick={() => navigate('/leave-outings')}
>
  <span>🚪</span>
  <h3>Leave & Outings</h3>
  <p>Apply for leave and outings.</p>
</div>

          <div
  className="feature-card"
  onClick={() => navigate('/mess')}
>
  <span>🍛</span>
  <h3>Mess</h3>
  <p>View today's mess menu.</p>
</div>

          <div
  className="feature-card"
  onClick={() => navigate('/notices')}
>
  <span>📢</span>
  <h3>Notices</h3>
  <p>See important hostel announcements.</p>
</div>

          <div
  className="feature-card"
  onClick={() => navigate('/housekeeping')}
>
  <span>🧹</span>
  <h3>Housekeeping</h3>
  <p>Request cleaning services.</p>
</div>

          <div
  className="feature-card"
  onClick={() => navigate('/attendance')}
>
  <span>📅</span>
  <h3>Attendance</h3>
  <p>Check your hostel attendance.</p>
</div>
        </div>
      </main>
    </div>
  )
}
function WardenNotices() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (title.trim() === '' || content.trim() === '' || date === '') {
      alert('Please fill in all fields')
      return
    }

    const newNotice = {
      title: title,
      content: content,
      date: date
    }

    try {
      const response = await fetch('http://localhost:8080/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNotice)
      })

      if (!response.ok) {
        throw new Error('Failed to create notice')
      }

      setTitle('')
      setContent('')
      setDate('')

      alert('Notice published successfully!')
    } catch (error) {
      console.error('Error creating notice:', error)
      alert('Could not publish notice.')
    }
  }

  return (
    <div className="warden-notices-page">
      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="warden-notices-content">
        <p className="tagline">WARDEN PANEL</p>

        <h1>Publish Notice</h1>

        <p className="description">
          Share important announcements with hostel residents.
        </p>

        <div className="notice-card">
          <form onSubmit={handleSubmit}>
            <label>Notice Title</label>

            <input
              type="text"
              placeholder="Example: Hostel inspection tomorrow"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label>Notice</label>

            <textarea
              placeholder="Write your announcement..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows="6"
            />

            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />

            <button className="primary-button" type="submit">
              Publish Notice
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

function Notices() {
  const navigate = useNavigate()

  const [notices, setNotices] = useState([])

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/notices')

        if (!response.ok) {
          throw new Error('Failed to fetch notices')
        }

        const data = await response.json()

        setNotices(data)
      } catch (error) {
        console.error('Error fetching notices:', error)
      }
    }

    fetchNotices()
  }, [])

  return (
    <div className="notices-page">
      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="notices-content">
        <p className="tagline">HOSTEL UPDATES</p>

        <h1>Notices</h1>

        <p className="description">
          Important announcements from your hostel.
        </p>

        {notices.length === 0 ? (
          <p className="empty-message">
            No notices available right now.
          </p>
        ) : (
          <div className="notices-list">
            {notices.map((notice) => (
              <div className="notice-card" key={notice.id}>
                <div>
                  <h2>{notice.title}</h2>
                  <p>{notice.content}</p>
                </div>

                <span className="notice-date">
                  {notice.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
function Complaints() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Maintenance')
  const [description, setDescription] = useState('')

  const [complaints, setComplaints] = useState([])
  useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/complaints')

      if (!response.ok) {
        throw new Error('Failed to fetch complaints')
      }

      const data = await response.json()

      setComplaints(data)
    } catch (error) {
      console.error('Error fetching complaints:', error)
    }
  }

  fetchComplaints()
}, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (title.trim() === '' || description.trim() === '') {
      alert('Please fill in all fields')
      return
    }

    const newComplaint = {
      title: title,
      category: category,
      description: description,
      status: 'Pending'
    }

    try {
      const response = await fetch('http://localhost:8080/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComplaint)
      })

      if (!response.ok) {
        throw new Error('Failed to submit complaint')
      }

      const message = await response.text()
      console.log(message)

      setComplaints([
        ...complaints,
        {
          id: complaints.length + 1,
          ...newComplaint
        }
      ])

      setTitle('')
      setCategory('Maintenance')
      setDescription('')

      alert('Complaint submitted successfully!')
    } catch (error) {
      console.error('Error submitting complaint:', error)
      alert('Could not submit complaint. Please try again.')
    }
  }

  return (
    <div className="complaints-page">
      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="complaints-content">
        <p className="tagline">HOSTEL SUPPORT</p>

        <h1>Complaints</h1>

        <p className="description">
          Something broken or not working? Let the hostel team know.
        </p>

        <div className="complaint-card">
          <h2>Submit a complaint</h2>

          <form onSubmit={handleSubmit}>
            <label>Complaint Title</label>

            <input
              type="text"
              placeholder="Example: Bathroom tap is leaking"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label>Category</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Maintenance</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Cleaning</option>
              <option>Mess</option>
              <option>Other</option>
            </select>

            <label>Describe the issue</label>

            <textarea
              placeholder="Explain what happened..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="5"
            />

            <button className="primary-button" type="submit">
              Submit Complaint
            </button>
          </form>
        </div>

        <div className="my-complaints">
          <h2>My Complaints</h2>

          {complaints.length === 0 ? (
            <p className="empty-message">
              You haven't submitted any complaints yet.
            </p>
          ) : (
            complaints.map((complaint) => (
              <div className="complaint-item" key={complaint.id}>
                <div>
                  <h3>{complaint.title}</h3>

                  <span className="category">
                    {complaint.category}
                  </span>

                  <p>{complaint.description}</p>
                </div>

                <span className="status">
                  {complaint.status}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
function LeaveOutings() {
  const navigate = useNavigate()

  const [studentName, setStudentName] = useState('')
  const [type, setType] = useState('Leave')
  const [reason, setReason] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/leave-requests'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch leave requests')
        }

        const data = await response.json()

        setRequests(data)
      } catch (error) {
        console.error('Error fetching leave requests:', error)
      }
    }

    fetchRequests()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      studentName.trim() === '' ||
      reason.trim() === '' ||
      fromDate === '' ||
      toDate === ''
    ) {
      alert('Please fill in all fields')
      return
    }

    const newRequest = {
      studentName: studentName,
      type: type,
      reason: reason,
      fromDate: fromDate,
      toDate: toDate,
      status: 'Pending'
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/leave-requests',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRequest)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to submit leave request')
      }

      const savedRequest = await response.json()

      setRequests([
        ...requests,
        savedRequest
      ])

      setStudentName('')
      setType('Leave')
      setReason('')
      setFromDate('')
      setToDate('')

      alert('Request submitted successfully!')
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Could not submit request. Please try again.')
    }
  }

  return (
    <div className="leave-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="leave-content">

        <p className="tagline">LEAVE & OUTINGS</p>

        <h1>Leave & Outings</h1>

        <p className="description">
          Submit a leave or outing request and track its status.
        </p>

        <div className="leave-card">

          <h2>New Request</h2>

          <form onSubmit={handleSubmit}>

            <label>Student Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
            />

            <label>Request Type</label>

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option>Leave</option>
              <option>Outing</option>
            </select>

            <label>Reason</label>

            <textarea
              placeholder="Why do you need leave?"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows="4"
            />

            <label>From Date</label>

            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />

            <label>To Date</label>

            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />

            <button
              className="primary-button"
              type="submit"
            >
              Submit Request
            </button>

          </form>

        </div>

        <div className="my-leave-requests">

          <h2>My Requests</h2>

          {requests.length === 0 ? (
            <p className="empty-message">
              You haven't submitted any requests yet.
            </p>
          ) : (
            requests.map((request) => (
              <div
                className="leave-request-item"
                key={request.id}
              >

                <div>
                  <h3>{request.type}</h3>

                  <p>{request.reason}</p>

                  <p>
                    {request.fromDate} → {request.toDate}
                  </p>
                </div>

                <span className="status">
                  {request.status}
                </span>

              </div>
            ))
          )}

        </div>

      </main>

    </div>
  )
}
function WardenLeaveRequests() {
  const navigate = useNavigate()

  const [requests, setRequests] = useState([])

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/leave-requests'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch leave requests')
      }

      const data = await response.json()

      setRequests(data)
    } catch (error) {
      console.error('Error fetching leave requests:', error)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/leave-requests/${id}/status?status=${status}`,
        {
          method: 'PUT'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      const updatedRequest = await response.json()

      setRequests(
        requests.map((request) =>
          request.id === updatedRequest.id
            ? updatedRequest
            : request
        )
      )
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Could not update request status.')
    }
  }

  return (
    <div className="warden-leave-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="warden-leave-content">

        <p className="tagline">WARDEN PANEL</p>

        <h1>Leave Requests</h1>

        <p className="description">
          Review and manage student leave and outing requests.
        </p>

        {requests.length === 0 ? (
          <p className="empty-message">
            No leave requests yet.
          </p>
        ) : (
          <div className="warden-requests-list">

            {requests.map((request) => (
              <div
                className="warden-request-card"
                key={request.id}
              >

                <div className="request-details">

                  <h2>{request.studentName}</h2>

                  <span className="category">
                    {request.type}
                  </span>

                  <p>
                    <strong>Reason:</strong> {request.reason}
                  </p>

                  <p>
                    <strong>Dates:</strong>{' '}
                    {request.fromDate} → {request.toDate}
                  </p>

                  <p>
                    <strong>Status:</strong>{' '}
                    {request.status}
                  </p>

                </div>

                {request.status === 'Pending' && (
                  <div className="request-actions">

                    <button
                      className="approve-button"
                      onClick={() =>
                        updateStatus(request.id, 'Approved')
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-button"
                      onClick={() =>
                        updateStatus(request.id, 'Rejected')
                      }
                    >
                      Reject
                    </button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  )
}
function Mess() {
  const navigate = useNavigate()

  const [menus, setMenus] = useState([])

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/mess-menu'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch mess menu')
        }

        const data = await response.json()

        setMenus(data)
      } catch (error) {
        console.error('Error fetching mess menu:', error)
      }
    }

    fetchMenus()
  }, [])

  return (
    <div className="mess-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="mess-content">

        <p className="tagline">MESS MANAGEMENT</p>

        <h1>Mess Menu</h1>

        <p className="description">
          Check what is being served throughout the week.
        </p>

        {menus.length === 0 ? (
          <p className="empty-message">
            No mess menu has been added yet.
          </p>
        ) : (
          <div className="mess-menu-list">

            {menus.map((menu) => (
              <div
                className="mess-day-card"
                key={menu.id}
              >

                <h2>{menu.day}</h2>

                <div className="meal">
                  <strong>🌅 Breakfast</strong>
                  <p>{menu.breakfast}</p>
                </div>

                <div className="meal">
                  <strong>☀️ Lunch</strong>
                  <p>{menu.lunch}</p>
                </div>

                <div className="meal">
                  <strong>☕ Snacks</strong>
                  <p>{menu.snacks}</p>
                </div>

                <div className="meal">
                  <strong>🌙 Dinner</strong>
                  <p>{menu.dinner}</p>
                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  )
}
function WardenMess() {
  const navigate = useNavigate()

  const [day, setDay] = useState('')
  const [breakfast, setBreakfast] = useState('')
  const [lunch, setLunch] = useState('')
  const [snacks, setSnacks] = useState('')
  const [dinner, setDinner] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      day === '' ||
      breakfast.trim() === '' ||
      lunch.trim() === '' ||
      snacks.trim() === '' ||
      dinner.trim() === ''
    ) {
      alert('Please fill in all fields')
      return
    }

    const newMenu = {
      day: day,
      breakfast: breakfast,
      lunch: lunch,
      snacks: snacks,
      dinner: dinner
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/mess-menu',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMenu)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create menu')
      }

      setDay('')
      setBreakfast('')
      setLunch('')
      setSnacks('')
      setDinner('')

      alert('Mess menu added successfully!')
    } catch (error) {
      console.error('Error creating menu:', error)
      alert('Could not add mess menu.')
    }
  }

  return (
    <div className="warden-mess-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="warden-mess-content">

        <p className="tagline">WARDEN PANEL</p>

        <h1>Manage Mess Menu</h1>

        <p className="description">
          Add the daily menu for hostel residents.
        </p>

        <div className="mess-form-card">

          <form onSubmit={handleSubmit}>

            <label>Day</label>

            <select
              value={day}
              onChange={(event) => setDay(event.target.value)}
            >
              <option value="">Select a day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>

            <label>Breakfast</label>

            <input
              type="text"
              placeholder="Example: Idli, Sambar"
              value={breakfast}
              onChange={(event) => setBreakfast(event.target.value)}
            />

            <label>Lunch</label>

            <input
              type="text"
              placeholder="Example: Rice, Dal, Vegetable"
              value={lunch}
              onChange={(event) => setLunch(event.target.value)}
            />

            <label>Snacks</label>

            <input
              type="text"
              placeholder="Example: Tea, Biscuits"
              value={snacks}
              onChange={(event) => setSnacks(event.target.value)}
            />

            <label>Dinner</label>

            <input
              type="text"
              placeholder="Example: Chapati, Paneer Curry"
              value={dinner}
              onChange={(event) => setDinner(event.target.value)}
            />

            <button
              className="primary-button"
              type="submit"
            >
              Add Menu
            </button>

          </form>

        </div>

      </main>

    </div>
  )
}
function Housekeeping() {
  const navigate = useNavigate()

  const [studentName, setStudentName] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [requestType, setRequestType] = useState('Room Cleaning')
  const [description, setDescription] = useState('')
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/housekeeping'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch housekeeping requests')
        }

        const data = await response.json()

        setRequests(data)
      } catch (error) {
        console.error('Error fetching housekeeping requests:', error)
      }
    }

    fetchRequests()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      studentName.trim() === '' ||
      roomNumber.trim() === '' ||
      description.trim() === ''
    ) {
      alert('Please fill in all fields')
      return
    }

    const newRequest = {
      studentName: studentName,
      roomNumber: roomNumber,
      requestType: requestType,
      description: description,
      status: 'Pending'
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/housekeeping',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRequest)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to submit housekeeping request')
      }

      const savedRequest = await response.json()

      setRequests([
        ...requests,
        savedRequest
      ])

      setStudentName('')
      setRoomNumber('')
      setRequestType('Room Cleaning')
      setDescription('')

      alert('Housekeeping request submitted!')
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Could not submit request. Please try again.')
    }
  }

  return (
    <div className="housekeeping-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="housekeeping-content">

        <p className="tagline">HOUSEKEEPING</p>

        <h1>Housekeeping</h1>

        <p className="description">
          Request cleaning or maintenance services for your room.
        </p>

        <div className="housekeeping-card">

          <h2>New Request</h2>

          <form onSubmit={handleSubmit}>

            <label>Student Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
            />

            <label>Room Number</label>

            <input
              type="text"
              placeholder="Example: 204"
              value={roomNumber}
              onChange={(event) => setRoomNumber(event.target.value)}
            />

            <label>Request Type</label>

            <select
              value={requestType}
              onChange={(event) => setRequestType(event.target.value)}
            >
              <option>Room Cleaning</option>
              <option>Bathroom Cleaning</option>
              <option>Garbage Collection</option>
              <option>Laundry</option>
              <option>Other</option>
            </select>

            <label>Description</label>

            <textarea
              placeholder="Describe what you need..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="5"
            />

            <button
              className="primary-button"
              type="submit"
            >
              Submit Request
            </button>

          </form>

        </div>

        <div className="my-housekeeping-requests">

          <h2>My Requests</h2>

          {requests.length === 0 ? (
            <p className="empty-message">
              You haven't submitted any housekeeping requests yet.
            </p>
          ) : (
            requests.map((request) => (
              <div
                className="housekeeping-request-item"
                key={request.id}
              >

                <div>
                  <h3>{request.requestType}</h3>

                  <span className="category">
                    Room {request.roomNumber}
                  </span>

                  <p>{request.description}</p>
                </div>

                <span className="status">
                  {request.status}
                </span>

              </div>
            ))
          )}

        </div>

      </main>

    </div>
  )
}
function WardenHousekeeping() {
  const navigate = useNavigate()

  const [requests, setRequests] = useState([])

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/housekeeping'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch housekeeping requests')
      }

      const data = await response.json()

      setRequests(data)
    } catch (error) {
      console.error('Error fetching housekeeping requests:', error)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/housekeeping/${id}/status?status=${status}`,
        {
          method: 'PUT'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update request')
      }

      const updatedRequest = await response.json()

      setRequests(
        requests.map((request) =>
          request.id === updatedRequest.id
            ? updatedRequest
            : request
        )
      )
    } catch (error) {
      console.error('Error updating housekeeping request:', error)
      alert('Could not update request.')
    }
  }

  return (
    <div className="warden-housekeeping-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="warden-housekeeping-content">

        <p className="tagline">WARDEN PANEL</p>

        <h1>Housekeeping Requests</h1>

        <p className="description">
          Review and manage student housekeeping requests.
        </p>

        {requests.length === 0 ? (
          <p className="empty-message">
            No housekeeping requests yet.
          </p>
        ) : (
          <div className="warden-housekeeping-list">

            {requests.map((request) => (
              <div
                className="warden-housekeeping-card"
                key={request.id}
              >

                <div>

                  <h2>{request.studentName}</h2>

                  <span className="category">
                    Room {request.roomNumber}
                  </span>

                  <p>
                    <strong>Request:</strong>{' '}
                    {request.requestType}
                  </p>

                  <p>
                    <strong>Description:</strong>{' '}
                    {request.description}
                  </p>

                  <p>
                    <strong>Status:</strong>{' '}
                    {request.status}
                  </p>

                </div>

                {request.status === 'Pending' && (
                  <button
                    className="approve-button"
                    onClick={() =>
                      updateStatus(request.id, 'Completed')
                    }
                  >
                    Mark Completed
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  )
}
function Attendance() {
  const navigate = useNavigate()

  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/attendance'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch attendance')
        }

        const data = await response.json()
        setAttendance(data)
      } catch (error) {
        console.error('Error fetching attendance:', error)
      }
    }

    fetchAttendance()
  }, [])

  const presentDays = attendance.filter(
    (record) => record.status === 'Present'
  ).length

  const absentDays = attendance.filter(
    (record) => record.status === 'Absent'
  ).length

  const totalDays = attendance.length

  const percentage =
    totalDays === 0
      ? 0
      : Math.round((presentDays / totalDays) * 100)

  return (
    <div className="attendance-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="attendance-content">

        <p className="tagline">ATTENDANCE</p>

        <h1>My Attendance</h1>

        <p className="description">
          Keep track of your hostel attendance.
        </p>

        <div className="attendance-summary">

          <div className="attendance-stat">
            <strong>{percentage}%</strong>
            <span>Attendance</span>
          </div>

          <div className="attendance-stat">
            <strong>{presentDays}</strong>
            <span>Present</span>
          </div>

          <div className="attendance-stat">
            <strong>{absentDays}</strong>
            <span>Absent</span>
          </div>

        </div>

        <div className="attendance-list">

          <h2>Attendance Records</h2>

          {attendance.length === 0 ? (
            <p className="empty-message">
              No attendance records available yet.
            </p>
          ) : (
            attendance.map((record) => (
              <div
                className="attendance-item"
                key={record.id}
              >
                <div>
                  <h3>{record.date}</h3>
                  <p>{record.studentName}</p>
                </div>

                <span className="status">
                  {record.status}
                </span>
              </div>
            ))
          )}

        </div>

      </main>

    </div>
  )
}
function WardenAttendance() {
  const navigate = useNavigate()

  const [studentName, setStudentName] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('Present')
  const [attendance, setAttendance] = useState([])

  const fetchAttendance = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/attendance'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch attendance')
      }

      const data = await response.json()
      setAttendance(data)
    } catch (error) {
      console.error('Error fetching attendance:', error)
    }
  }

  useEffect(() => {
    fetchAttendance()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      studentName.trim() === '' ||
      date === ''
    ) {
      alert('Please fill in all fields')
      return
    }

    const newAttendance = {
      studentName: studentName,
      date: date,
      status: status
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/attendance',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAttendance)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to save attendance')
      }

      const savedAttendance = await response.json()

      setAttendance([
        ...attendance,
        savedAttendance
      ])

      setStudentName('')
      setDate('')
      setStatus('Present')

      alert('Attendance marked successfully!')
    } catch (error) {
      console.error('Error saving attendance:', error)
      alert('Could not save attendance.')
    }
  }

  return (
    <div className="warden-attendance-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="warden-attendance-content">

        <p className="tagline">WARDEN PANEL</p>

        <h1>Manage Attendance</h1>

        <p className="description">
          Mark and manage student attendance.
        </p>

        <div className="attendance-form-card">

          <form onSubmit={handleSubmit}>

            <label>Student Name</label>

            <input
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(event) =>
                setStudentName(event.target.value)
              }
            />

            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
            />

            <label>Status</label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option>Present</option>
              <option>Absent</option>
            </select>

            <button
              className="primary-button"
              type="submit"
            >
              Mark Attendance
            </button>

          </form>

        </div>

        <div className="warden-attendance-list">

          <h2>Attendance Records</h2>

          {attendance.length === 0 ? (
            <p className="empty-message">
              No attendance records yet.
            </p>
          ) : (
            attendance.map((record) => (
              <div
                className="attendance-item"
                key={record.id}
              >
                <div>
                  <h3>{record.studentName}</h3>
                  <p>{record.date}</p>
                </div>

                <span className="status">
                  {record.status}
                </span>
              </div>
            ))
          )}

        </div>

      </main>

    </div>
  )
}
function WardenDashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/')}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">

        <p className="tagline">WARDEN PANEL</p>

        <h1>Warden Dashboard</h1>

        <p className="description">
          Manage hostel activities and student requests.
        </p>

        <div className="feature-grid">

          <div
            className="feature-card"
            onClick={() => navigate('/warden-notices')}
          >
            <span>📢</span>
            <h3>Notices</h3>
            <p>Publish hostel announcements.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate('/warden-leave-requests')}
          >
            <span>🚪</span>
            <h3>Leave Requests</h3>
            <p>Review and approve student requests.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate('/warden-mess')}
          >
            <span>🍛</span>
            <h3>Mess Menu</h3>
            <p>Manage the weekly mess menu.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate('/warden-housekeeping')}
          >
            <span>🧹</span>
            <h3>Housekeeping</h3>
            <p>Manage cleaning requests.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate('/warden-attendance')}
          >
            <span>📅</span>
            <h3>Attendance</h3>
            <p>Mark and manage student attendance.</p>
          </div>

          <div
  className="feature-card"
  onClick={() => navigate('/warden-complaints')}
>
            <span>🔧</span>
            <h3>Complaints</h3>
            <p>View hostel complaints.</p>
          </div>

        </div>

      </main>

    </div>
  )
}
function WardenComplaints() {
  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])

  const fetchComplaints = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/complaints'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch complaints')
      }

      const data = await response.json()
      setComplaints(data)
    } catch (error) {
      console.error('Error fetching complaints:', error)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/complaints/${id}/status?status=${status}`,
        {
          method: 'PUT'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update complaint')
      }

      const updatedComplaint = await response.json()

      setComplaints(
        complaints.map((complaint) =>
          complaint.id === updatedComplaint.id
            ? updatedComplaint
            : complaint
        )
      )
    } catch (error) {
      console.error('Error updating complaint:', error)
      alert('Could not update complaint status.')
    }
  }

  return (
    <div className="warden-complaints-page">

      <header className="dashboard-navbar">
        <h2>Wardenly</h2>

        <button
          className="logout-button"
          onClick={() => navigate('/warden-dashboard')}
        >
          ← Dashboard
        </button>
      </header>

      <main className="warden-complaints-content">

        <p className="tagline">WARDEN PANEL</p>

        <h1>Student Complaints</h1>

        <p className="description">
          Review and manage complaints submitted by hostel residents.
        </p>

        {complaints.length === 0 ? (
          <p className="empty-message">
            No complaints submitted yet.
          </p>
        ) : (
          <div className="warden-complaints-list">

            {complaints.map((complaint) => (
              <div
                className="warden-complaint-card"
                key={complaint.id}
              >

                <div>

                  <h2>{complaint.title}</h2>

                  <span className="category">
                    {complaint.category}
                  </span>

                  <p>
                    <strong>Description:</strong>{' '}
                    {complaint.description}
                  </p>

                  <p>
                    <strong>Status:</strong>{' '}
                    {complaint.status}
                  </p>

                </div>

                {complaint.status !== 'Resolved' && (
                  <div className="request-actions">

                    {complaint.status === 'Pending' && (
                      <button
                        className="approve-button"
                        onClick={() =>
                          updateStatus(
                            complaint.id,
                            'In Progress'
                          )
                        }
                      >
                        Start
                      </button>
                    )}

                    {complaint.status === 'In Progress' && (
                      <button
                        className="approve-button"
                        onClick={() =>
                          updateStatus(
                            complaint.id,
                            'Resolved'
                          )
                        }
                      >
                        Resolve
                      </button>
                    )}

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Routes>

  <Route
    path="/"
    element={<Home />}
  />
  <Route
  path="/warden-complaints"
  element={<WardenComplaints />}
/>

  <Route
    path="/student-login"
    element={<StudentLogin />}
  />

  <Route
  path="/student-dashboard"
  element={
    <ProtectedRoute role="STUDENT">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

  <Route
    path="/complaints"
    element={<Complaints />}
  />

  <Route
    path="/notices"
    element={<Notices />}
  />

  <Route
    path="/warden-notices"
    element={<WardenNotices />}
  />

  <Route
    path="/leave-outings"
    element={<LeaveOutings />}
  />

  <Route
    path="/warden-leave-requests"
    element={<WardenLeaveRequests />}
  />
  <Route
  path="/mess"
  element={<Mess />}
/>
<Route
  path="/warden-mess"
  element={<WardenMess />}
/>
<Route
  path="/housekeeping"
  element={<Housekeeping />}
/>
<Route
  path="/warden-housekeeping"
  element={<WardenHousekeeping />}
/>
<Route
  path="/attendance"
  element={<Attendance />}
/>
<Route
  path="/warden-attendance"
  element={<WardenAttendance />}
/>
<Route
  path="/warden-dashboard"
  element={
    <ProtectedRoute role="WARDEN">
      <WardenDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/warden-login"
  element={<WardenLogin />}
/>

</Routes>
    </BrowserRouter>
  )
}

export default App