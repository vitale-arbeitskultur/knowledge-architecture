import React from 'react'

export default function Navigation({ currentView }) {
  const navItems = [
    { id: 'blueprint', label: 'Blueprint', hash: '#blueprint' },
    { id: 'applications', label: 'Applications', hash: '#applications' },
    { id: 'domains', label: 'Domains', hash: '#domains' },
    { id: 'integrations', label: 'Integrations', hash: '#integrations' },
    { id: 'guide', label: 'Guide', hash: '#guide' }
  ]

  return (
    <nav className="nav">
      <div className="nav-brand">
        KM <span>Architecture</span>
      </div>
      <div className="nav-links">
        {navItems.map(item => (
          <a
            key={item.id}
            href={item.hash}
            className={`nav-link ${currentView === item.id ? 'active' : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
