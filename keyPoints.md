-main theme should be black and white for now (primary colour = black , and secondary colour = white)
-On theme Toggle it should replace the colour theme (primary colour = white , and secondary colour =  black)
-3 pages for now (login , signUp , upload Page )
-the upload Page for now should have option to upload images not file because we will first test it 
-should use shadCn , tailwind css , react
-the Ui should contain those cool hover effects and animations like this 
{
Hover effect (changes when mouse is over it)
Fade in / fade out (opacity change)
Slide in (element moves in from a side)
Scale up / scale down (zoom effect)
Parallax (background moves slower than foreground)
Staggered animation (elements appear one after another)
Spring animation (bouncy effect)
} it shoudl not contain all of them ofc select th best by yourr self 
///////////////////////////////////
Title: Document Analyzer Web App – Initial UI Build
Framework & Tools: React JS  + Tailwind CSS + ShadCN UI

{Theme & Styling:}

-Primary color: Black, Secondary color: White (Dark mode default)
-Theme toggle: Switch to Light mode (Primary = White, Secondary = Black)
-Typography: Clean, modern (e.g., Inter or similar)
-Rounded corners, smooth shadows, and subtle gradients where needed

{Pages:}
-Login Page – clean auth form using ShadCN form components
-Sign-Up Page – similar style to login
-Upload Page – initial version supports image uploads only (no PDF yet)

{Upload Page Layout:}
{Navbar (top, sticky):}
-Left: App name/logo (placeholder)
-Center: "Upload Image" button (ShadCN button + hover effect)
-Right: Theme toggle + profile/settings dropdown

{Sidebar (left, collapsible):}
-Title: "History"
-List of past uploads/conversations (dummy data for now)
-Collapses on small screens with a slide animation

{Main Content (center):}
-Image preview area with placeholder until upload
-On image upload, smoothly fade in the preview
-Later upgrade to PDF viewer with features

{Chat Box (right)}:
-Vertical message list (dummy messages for now)
-Input bar at bottom
-Smooth slide-up animation when sending messages

{Animations & Interactions: (choose best for a smooth experience)}
-Hover: Buttons scale up slightly & color change
-Fade-in for page sections when loaded
-Slide-in for sidebar and chat box
-Staggered list animations for history items and chat messages
-Spring/bounce effect for important clickable elements

{Component Requirements:}
-Use ShadCN components for navbar, sidebar, forms, buttons, and inputs
-Modular structure: each page and section as its own component
-Tailwind utilities for layout + responsive design
-Include basic responsiveness for mobile/tablet/desktop

{Create an image upload dropzone with:}
-A dashed border box
-A centered upload icon (can be an arrow or image icon)
-Text: "Click to upload, or drag image here"
-A secondary small note with an arrow pointing to the box saying: "Drag + Drop your image here"
-A primary button below the text saying "Upload Image"
-Hover effect: glow/shadow animation on the border
-Smooth fade-in when appearing

{Extra:}
-Keep the code clean, well-structured, and easy to extend
-Placeholder data where real backend logic will go later

