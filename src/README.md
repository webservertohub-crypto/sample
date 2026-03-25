# Project Tracker UI

##  Live Demo
https://practice-lime-zeta.vercel.app/



##  Features

Kanban Board (Drag & Drop)
List View (Virtual Scrolling)
Timeline / Gantt View
 URL-based Filters
Real-time Collaboration Indicators



##  Tech Stack

 React + TypeScript
 Tailwind CSS
Custom State Management (useState + useEffect)



##  Key Implementations

###  Drag and Drop
Built from scratch using pointer events. Maintained dragged state and implemented drop zones with visual feedback.

###  Virtual Scrolling
Rendered only visible rows based on scroll position with buffer rows to maintain smooth scrolling performance for 500+ tasks.

###  Filters + URL Sync
Used react-router search params to persist filters in URL and restore state on navigation.

###  Collaboration Simulation
Simulated real-time users using interval updates and mapped them to random tasks.


## Performance


[Lighthouse Report](../test.png)

---

## Setup

npm install
npm run dev


---

#  STEP 3: EXPLANATION 

The most challenging part of this project was implementing custom drag-and-drop without using any external libraries. Handling pointer events, tracking the dragged element, and ensuring a smooth user experience with proper visual feedback required careful state management. I implemented a floating drag preview and maintained a placeholder-like behavior by conditionally rendering styles on the original card to avoid layout shifts.

Another complex area was virtual scrolling for the list view. Instead of rendering all 500+ tasks, I calculated the visible range based on scroll position and dynamically rendered only those items along with a small buffer. This significantly improved performance and ensured smooth scrolling without flickering or blank spaces.

If I had more time, I would further refine the drag-and-drop experience by adding animated transitions between columns and improving accessibility, such as keyboard drag support.


